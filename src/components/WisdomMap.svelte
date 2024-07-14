<script>
  import { Transformer } from "markmap-lib";
  import * as markmap from "markmap-view";
  import { onMount } from "svelte";
  import InfoWindow from "./InfoWindow.svelte";
  import { WEBSERVER_HOST } from "../constants";
  import yaml, { parse } from "yaml";
  import ErrorPage from "./ErrorPage.svelte";
  //todo MAKE avoiding circle events more performant

  //--------------------------------------------------
  // props
  //--------------------------------------------------
  export let _ChosenTopic = "";
  let _selectedElement = null;
  let _selectedSubTopic = "";
  let _isInfoWindowVisible = false;
  let _wisdomMapObject = null;
  let _error = null;

  let _markdownStr = null;
  let _parsedSubTopicInfosObj = null;
  let _parsedOptionsObj = null;

  onMount(() => {
    if (!_ChosenTopic) {
      _error = "NO_TOPIC";
      return;
    }
    getInfosByTopic(_ChosenTopic); //sets _markdownStr and _parsedOptionsObj and _parsedSubTopicInfosObj

    setTimeout(() => {
      if (!_markdownStr) {
        _error = "NON_EXISTING_TOPIC";
        return;
      }
      initWisdomMap(
        _markdownStr,
        _parsedOptionsObj["initialExpandLevel"],
        _parsedOptionsObj["colorFreezeLevel"],
        _parsedOptionsObj["colors"]
      );
    }, 1000);
  });

  //--------------------------------------------------
  // functions
  //--------------------------------------------------
  function initWisdomMap(
    p_markdownStr,
    p_initialExpandLevel,
    p_colorFreezeLevel,
    p_colors
  ) {
    const transformer = new Transformer();

    // 0. transform markdown to data
    const { root, features } = transformer.transform(p_markdownStr);
    const { styles, scripts } = transformer.getUsedAssets(features);
    const { Markmap, loadCSS, loadJS } = markmap;

    // 1. load assets
    if (styles) loadCSS(styles);
    if (scripts) loadJS(scripts, { getMarkmap: () => markmap });

    // 2. create markmap
    const options = markmap.deriveOptions({
      colorFreezeLevel: p_colorFreezeLevel,
      initialExpandLevel: p_initialExpandLevel,
      color: p_colors
    });
    _wisdomMapObject = Markmap.create("#markmap", options, root);
    console.log(_wisdomMapObject);

    window.addEventListener("click", selectSubTopic);
    window.addEventListener("keyup", selectSubTopicWithArrows);
  }

  function selectSubTopic(event) {
    let element = event.target;
    if (!element.hasAttribute("xmlns") && element.tagName != "MARK") return;
    if (element.tagName == "MARK") element = element.parentElement;
    highlightTopic(element);
    _selectedSubTopic = element.innerText;
    _isInfoWindowVisible = false;
    _isInfoWindowVisible = true; // force rerender
  }

  function selectSubTopicWithArrows(event) {
    const { key } = event;
    if (key === "ArrowLeft" || key === "ArrowRight") {
      if (!_selectedElement) return;
      const currentDataPath = getCurrentDataPath();
      const targetElement = calcTargetElementIfLeftOrRight(
        currentDataPath,
        event,
      );
      if (!targetElement) return;
      highlightTopic(targetElement);
      _selectedSubTopic = targetElement.innerText;
    } else if (key === "ArrowDown" || key === "ArrowUp") {
      if (!_selectedElement) return;
      const currentDataPath = getCurrentDataPath();
      const targetElement = calcTargetElementIfUpOrDown(currentDataPath, event);
      if (!targetElement) return;
      highlightTopic(targetElement);
      _selectedSubTopic = targetElement.innerText;
    }
  }

  function calcTargetElementIfLeftOrRight(currentDataPath, event) {
    let targetDataPath;
    switch (event.key) {
      case "ArrowLeft":
        targetDataPath = getParentNodeDataPathFrom(currentDataPath);
        break;
      case "ArrowRight":
        targetDataPath = `${currentDataPath}.${Number(currentDataPath.split(".").pop()) + 1}`;
        break;
    }

    const targetGroup = Array.from(document.getElementsByTagName("g")).find(
      (el) => el.getAttribute("data-path") === targetDataPath,
    );

    if (!targetGroup) return null;

    const targetElement = Array.from(targetGroup.children).find(
      (el) => el.tagName === "foreignObject",
    )?.children[0];

    return targetElement || null;
  }

  function calcTargetElementIfUpOrDown(currentDataPath, event) {
    const sameParentNodes = Array.from(
      document.getElementsByTagName("g"),
    ).filter(
      (el) =>
        getParentNodeDataPathFrom(el.getAttribute("data-path")) ===
        getParentNodeDataPathFrom(currentDataPath),
    );

    const currentlySelectedIndex = sameParentNodes.findIndex(
      (el) => el.getAttribute("data-path") === currentDataPath,
    );
    const targetIndex =
      event.key === "ArrowUp"
        ? currentlySelectedIndex + 1
        : currentlySelectedIndex - 1;
    const totalNodes = sameParentNodes.length;

    let targetNode;
    if (targetIndex < 0) {
      targetNode = sameParentNodes[totalNodes - 1];
    } else if (targetIndex >= totalNodes) {
      targetNode = sameParentNodes[0];
    } else {
      targetNode = sameParentNodes[targetIndex];
    }

    const targetElement = Array.from(targetNode.children).find(
      (el) => el.tagName === "foreignObject",
    )?.children[0];

    return targetElement || null;
  }

  function highlightTopic(element) {
    if (_selectedElement) {
      _selectedElement.classList.remove("active");
    }

    _selectedElement = element;
    _selectedElement.classList.add("active");
  }

  function getCurrentDataPath() {
    switch (_selectedElement.tagName) {
      case "MARK":
        return _selectedElement.parentNode.parentNode.parentNode.getAttribute(
          "data-path",
        );
      case "DIV":
        return _selectedElement.parentNode.parentNode.getAttribute("data-path");
    }
  }

  function getParentNodeDataPathFrom(currentDataPath) {
    if (!currentDataPath) return null;
    return currentDataPath.split(".").slice(0, -1).join(".");
  }

  async function getInfosByTopic(p_topic) {
    fetch(WEBSERVER_HOST + `/${p_topic}.yml`)
      .then((response) => response.text())
      .then((infosYML) => {
        const parsedInfos = parseYML(infosYML);
        _parsedSubTopicInfosObj = parsedInfos.parsedSubTopicInfosObj;
        _parsedOptionsObj = parsedInfos.parsedOptionsObj;
        _markdownStr = parsedInfos.markmapStr;
        console.log("fetched:\n" + _markdownStr);
      });
  }

  function parseYML(p_ymlStr) {
    const parts = p_ymlStr.split("---");
    const optionsYML = parts[0];
    const markmapStr = parts[1];
    const subTopicInfosYML = parts[2];
    const parsedOptionsObj = yaml.parse(optionsYML);
    const parsedSubTopicInfosObj = yaml.parse(subTopicInfosYML);
    return { markmapStr, parsedOptionsObj, parsedSubTopicInfosObj };
  }
</script>

<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<ErrorPage _Error={_error} />
<svg id="markmap" style="width: 100%; height: 100vh"></svg>
<InfoWindow
  _SubTopic={_selectedSubTopic}
  _Visible={_isInfoWindowVisible}
  _ParsedSubTopicInfosObj={_parsedSubTopicInfosObj}
/>

<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<style>
</style>

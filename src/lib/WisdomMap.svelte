<script>
  import { Transformer } from 'markmap-lib';
  import * as markmap from 'markmap-view';
  import { onMount } from 'svelte';
  import InfoWindow from './InfoWindow.svelte';

  //--------------------------------------------------
  // props
  //--------------------------------------------------
  export let _ChosenTopic = "";
  let _lastSelectedElem = null;
  let _selectedSubTopic = "";
  let _isInfoWindowVisible = false;
  let _wisdomMapObject = null;

  import markdownsWithOptions from '../../public/markdownWithOptions.js';
  const markdownStr = markdownsWithOptions[_ChosenTopic].markdownStr; console.log(markdownStr); //todo get from api if app gets bigger//todo const markdownsWithOptions = getMarkdownWithOptions(_ChosenTopic);
  const initialExpandLevel = Number(markdownsWithOptions[_ChosenTopic].initialExpandLevel);
  const colorFreezeLevel = Number(markdownsWithOptions[_ChosenTopic].colorFreezeLevel);

  onMount(() => {    
    window.addEventListener("click", selectSubTopic);
    window.addEventListener("keyup", selectSubTopicWithArrows);
    initWisdomMap(markdownStr, initialExpandLevel, colorFreezeLevel);
  });

  //--------------------------------------------------
  // functions
  //--------------------------------------------------
  function initWisdomMap(p_markdownStr, p_initialExpandLevel, p_colorFreezeLevel) {
    const transformer = new Transformer();
        
    // 0. transform markdown to data
    const { root, features } = transformer.transform(p_markdownStr);
    const { styles, scripts } = transformer.getUsedAssets(features);
    const { Markmap, loadCSS, loadJS } = markmap;

    // 1. load assets
    if (styles) loadCSS(styles);
    if (scripts) loadJS(scripts, { getMarkmap: () => markmap });

    // 2. create markmap
    const options = markmap.deriveOptions( {colorFreezeLevel: p_colorFreezeLevel, initialExpandLevel: p_initialExpandLevel} );
    _wisdomMapObject = Markmap.create('#markmap', options, root);
    console.log(_wisdomMapObject);
  }

  function highlightTopic(elem) {
    if (_lastSelectedElem) {
      _lastSelectedElem.classList.remove("active");
    }
    //// const underline = e.target.parentNode.parentNode.children[0];
    _lastSelectedElem = elem;
    _lastSelectedElem.classList.add("active");
  }

  function selectSubTopic(event) {
    let elem = event.target;
    if(!elem.hasAttribute("xmlns")) return;
    highlightTopic(elem);
    _selectedSubTopic = elem.innerText;
    _isInfoWindowVisible = false; _isInfoWindowVisible = true; //forces rerender
  }

  // // function o(s) {
  // //   console.log(s);
  // // }

  function selectSubTopicWithArrows(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (!_lastSelectedElem) return;
      let currentDataPath =_lastSelectedElem.parentNode.parentNode.getAttribute("data-path");
      let targetDataPath = calcTargetDataPath(currentDataPath, e);
  // // o(targetDataPath);
      const temp = Array.from(document.getElementsByTagName('g')).filter(el => el.getAttribute('data-path') === targetDataPath)[0];
      const targetElem = Array.from(temp.children).filter(el => el.tagName === 'foreignObject')[0].children[0];
  // // o(targetElem);
      if (!targetElem) return;
      highlightTopic(targetElem);
      _selectedSubTopic = targetElem.innerText;
    }
    else if(e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!_lastSelectedElem) return;
      let currentDataPath =_lastSelectedElem.parentNode.parentNode.getAttribute("data-path");
      let targetElem = Array.from(calcTargetElem(currentDataPath, e).children).filter(el => el.tagName === 'foreignObject')[0].children[0];
      if (!targetElem) return;
      highlightTopic(targetElem);
      _selectedSubTopic = targetElem.innerText;
    }
  }

  function calcTargetDataPath(currentDataPath, event) {
    switch (event.key) {        
      case "ArrowLeft":
        return currentDataPath.split('.').slice(0, -1).join('.');//remove last element 
      case "ArrowRight":
        return  currentDataPath+'.'+(Number(currentDataPath.split('.').pop()) + 1)
    }
  }

  function calcTargetElem(currentDataPath, event) {
    //finds all elements with data-depth same as currently selected element
    const elems = Array.from(document.getElementsByTagName('g')).filter(el => el.getAttribute('data-depth') === (currentDataPath.split('.').length - 1).toString());
    //finds index of currently selected element
    const index = elems.findIndex(el => el.getAttribute('data-path') === currentDataPath);
    //returns data-path of element above or below
    return event.key === "ArrowUp" ? elems[index + 1] : elems[index - 1];
  }
</script>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<svg id="markmap" style="width: 100%; height: 100vh" ></svg>
<InfoWindow _SubTopic={_selectedSubTopic} _Visible={_isInfoWindowVisible}/>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<style>

</style>
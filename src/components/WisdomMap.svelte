<script>
import { Transformer } from 'markmap-lib';
import * as markmap from 'markmap-view';
import { onMount } from 'svelte';
import InfoWindow from './InfoWindow.svelte';

//--------------------------------------------------
// props
//--------------------------------------------------
export let _ChosenTopic = "";
let _selectedElement = null;
let _selectedSubTopic = "";
let _isInfoWindowVisible = false;
let _wisdomMapObject = null;

import markdownsWithOptions from '../../public/markdownWithOptions.js';
const markdownStr = markdownsWithOptions[_ChosenTopic]?.markdownStr; console.log(markdownStr); //todo get from api if app gets bigger//todo const markdownsWithOptions = getMarkdownWithOptions(_ChosenTopic);
const initialExpandLevel = Number(markdownsWithOptions[_ChosenTopic]?.initialExpandLevel);
const colorFreezeLevel = Number(markdownsWithOptions[_ChosenTopic]?.colorFreezeLevel);

onMount(() => {    
  if (!markdownStr) {console.log("invalid topic"); return;}
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

  window.addEventListener("click", selectSubTopic);
  window.addEventListener("keyup", selectSubTopicWithArrows);
  overwriteMouseEventsOnCircles();
  document.querySelectorAll("circle").forEach(el => el.addEventListener("click", () => {
    overwriteMouseEventsOnCircles();
  }));
}

function overwriteMouseEventsOnCircles() {
document.querySelectorAll("circle").forEach(el => {
  el.addEventListener("mousedown", stopPropagation); 
  el.addEventListener("dblclick", stopPropagation);
  });
}

function stopPropagation(event) {
  event.stopPropagation();
}

function selectSubTopic(event) {
  const element = event.target;
  if (!element.hasAttribute("xmlns")) return;

  highlightTopic(element);
  _selectedSubTopic = element.innerText;
  _isInfoWindowVisible = false; _isInfoWindowVisible = true; // force rerender
}

function selectSubTopicWithArrows(event) {
  const { key } = event;
  if (key === "ArrowLeft" || key === "ArrowRight") {
    if (!_selectedElement) return;
    const currentDataPath = getCurrentDataPath();
    const targetElement = calcTargetElementIfLeftOrRight(currentDataPath, event);
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
      targetDataPath = `${currentDataPath}.${Number(currentDataPath.split('.').pop()) + 1}`;
      break;
  }

  const targetGroup = Array.from(document.getElementsByTagName('g'))
    .find(el => el.getAttribute('data-path') === targetDataPath);

  if (!targetGroup) return null;

  const targetElement = Array.from(targetGroup.children)
    .find(el => el.tagName === 'foreignObject')?.children[0];

  return targetElement || null;
}

function calcTargetElementIfUpOrDown(currentDataPath, event) {
  const sameParentNodes = Array.from(document.getElementsByTagName('g'))
    .filter(el => getParentNodeDataPathFrom(el.getAttribute('data-path')) === getParentNodeDataPathFrom(currentDataPath));

  const currentlySelectedIndex = sameParentNodes.findIndex(el => el.getAttribute('data-path') === currentDataPath);
  const targetIndex = event.key === "ArrowUp" ? currentlySelectedIndex + 1 : currentlySelectedIndex - 1;
  const totalNodes = sameParentNodes.length;

  let targetNode;
  if (targetIndex < 0) {
    targetNode = sameParentNodes[totalNodes - 1];
  } else if (targetIndex >= totalNodes) {
    targetNode = sameParentNodes[0];
  } else {
    targetNode = sameParentNodes[targetIndex];
  }

  const targetElement = Array.from(targetNode.children)
    .find(el => el.tagName === 'foreignObject')?.children[0];

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
  return _selectedElement.parentNode.parentNode.getAttribute("data-path");
}

function getParentNodeDataPathFrom(currentDataPath) {
  if (!currentDataPath) return null;

  return currentDataPath.split('.').slice(0, -1).join('.');
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
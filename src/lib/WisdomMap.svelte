<script>
  import { Transformer } from 'markmap-lib';
  import * as markmap from 'markmap-view';
  import { onMount } from 'svelte';
  import InfoWindow from './InfoWindow.svelte';
  import markdownsWithOptions from '../../public/markdown.js';

  //--------------------------------------------------
  // props
  //--------------------------------------------------
  export let chosenTopic = "SIEMENS";

  
  onMount(() => {   
  const MARKDOWN = markdownsWithOptions[chosenTopic].markdownStr; console.log(MARKDOWN); //todo get from api if app gets bigger//todo const markdownsWithOptions = getMarkdownWithOptions(chosenTopic);
  const INITIALEXPANDLEVEL = Number(markdownsWithOptions[chosenTopic].initialExpandLevel);
  const COLORFREEZELEVEL = Number(markdownsWithOptions[chosenTopic].colorFreezeLevel);

  const transformer = new Transformer();
      
  // 0. transform markdown to data
  const { root, features } = transformer.transform(MARKDOWN);
  const { styles, scripts } = transformer.getUsedAssets(features);
  const { Markmap, loadCSS, loadJS } = markmap;

  // 1. load assets
  if (styles) loadCSS(styles);
  if (scripts) loadJS(scripts, { getMarkmap: () => markmap });

  // 2. create markmap
  const options = markmap.deriveOptions( {colorFreezeLevel: COLORFREEZELEVEL, initialExpandLevel: INITIALEXPANDLEVEL} );
  Markmap.create('#markmap', options, root);
});


let lastSelectedElem = null;
let selectedSubTopic = "";
let isInfoWindowVisible = false;

function highlightTopic(elem) {
  if (lastSelectedElem) {
    lastSelectedElem.classList.remove("active");
  }
  //// const underline = e.target.parentNode.parentNode.children[0];
  lastSelectedElem = elem;
  lastSelectedElem.classList.add("active");
}

function selectSubTopic(event) {
  const elem = event.target;
  if(!elem.hasAttribute("xmlns")) return;
  highlightTopic(elem);
  selectedSubTopic = elem.innerText;
  isInfoWindowVisible = false; isInfoWindowVisible = true; //force rerender
}
</script>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<svg id="markmap" on:click={selectSubTopic} style="width: 100%; height: 100vh" ></svg>
<InfoWindow subTopic={selectedSubTopic} visible={isInfoWindowVisible}/>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<style>
  
</style>
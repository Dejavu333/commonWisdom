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
    window.addEventListener("keyup", f);
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

  function f(e) {
    //sadpaths
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const rootNode = _wisdomMapObject.state.data;
    const n = traverseGraph(rootNode);
    if (n===undefined) return;
    // // console.log(n);

    //select the one next from the children
    const currentlyShownNodes = document.querySelectorAll("foreignObject>div");


    //happy path
    // switch (e.key) {
    //   case "ArrowUp":
        
    //   case "ArrowDown":

    //   case "ArrowLeft":
    //     highlightTopic(n.state.el.parentElement)

    //   case "ArrowRight":
    //     highlightTopic(n.state.el.parentElement)
    // }
  }

  function traverseGraph(rootNode) {
      //base case I.
      if(rootNode.content === _lastSelectedElem.innerText) return rootNode;
      if(rootNode.children) {
        rootNode.children.forEach(n => {
          //base case II.
          if(n.content === _lastSelectedElem.innerText) {
            console.log(n);
            return n;
          }
          //recursive case
          else {
            traverseGraph(n);
          }
        });
      }
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
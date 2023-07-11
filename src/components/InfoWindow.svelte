<script>
import { scale } from "svelte/transition";
import { quintOut } from "svelte/easing";
//--------------------------------------------------
// props
//--------------------------------------------------

export let _Visible = false;
$: if (_Visible) {
    window.addEventListener("keyup", handleEsc);
    window.removeEventListener("keyup", handleEnter);
} else {
    window.removeEventListener("keyup", handleEsc);
    window.addEventListener("keyup", handleEnter);
}

export let _ParsedSubTopicInfosObj = null;
export let _SubTopic = "";
let infoAboutSubTopic = "";
$: setInfoAboutSubTopic(_SubTopic);

//--------------------------------------------------
// functions
//--------------------------------------------------
function setInfoAboutSubTopic(_SubTopic) {
    if (!_SubTopic) {console.log("no subtopic was provided"); return;}
    _ParsedSubTopicInfosObj[_SubTopic] ? infoAboutSubTopic = _ParsedSubTopicInfosObj[_SubTopic] : infoAboutSubTopic = "No infos about this subtopic yet";

    setTimeout(() => {
        document.querySelectorAll("pre").forEach((block) => {
            // block.classList.remove("active-code");
            block.classList.add("active-code");
        });
        Prism.highlightAll();
    }, 30);
}

function handleEsc(event) {
    if (event.key === "Escape") {
        closeInfoWindow();
    }
}

function handleEnter(event) {
    if (event.key === "Enter" && _SubTopic !== "") {
        openInfoWindow();
    }
}

function openInfoWindow() {
    _Visible = true;
}

function closeInfoWindow() {
    _Visible = false;
}
</script>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
{#if _Visible}
<div id="infosContainer" transition:scale={{ delay: 250, duration: 300, easing: quintOut }}>
    <button on:click={closeInfoWindow} title="esc">X</button>
    <h1>{_SubTopic}</h1>
    {@html infoAboutSubTopic}
</div>
{/if}
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<style>
    button {
        width: 30px;
        height: 30px;
        float: right;
        padding: 5px;
        border-radius: 50%;
        border: 2px solid var(--activeColor);
    }

    button:hover {
        background-color: var(--activeColor);
        color: var(--lightColor);
    }

    #infosContainer {
        opacity: 0.93;
        position: absolute;
        float: right;
        width: 40%;
        height: 100vh;
        background-color: var(--lightColor);
        border-left: 3px solid var(--activeColor);
        top: 0;
        right: 0;
        overflow:scroll;
        padding: 20px;
    }
</style>
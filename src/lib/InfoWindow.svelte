<script>
import { scale } from "svelte/transition";
import { quintOut } from "svelte/easing";

    //--------------------------------------------------
    // props
    //--------------------------------------------------
    export let _Visible = false;
    $: if (_Visible) {
        window.addEventListener("keydown", handleEsc);
    } else {
        window.removeEventListener("keydown", handleEsc);
    }

    export let _SubTopic = "";
    let infoAboutSubTopic = "";
    $: readInfosByTopic(_SubTopic);

    //--------------------------------------------------
    // functions
    //--------------------------------------------------
    import infos from "../../public/subTopicInfos.json";  //todo ged infos from api by _SubTopic if the app gets bigger
    function readInfosByTopic(_SubTopic) {
        if (!_SubTopic) return;
        infos[_SubTopic] ? infoAboutSubTopic = infos[_SubTopic] : infoAboutSubTopic = "No infos about this subtopic yet";
    }

    function handleEsc(event) {
        if (event.key === "Escape") {
            closeInfoWindow();
        }
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
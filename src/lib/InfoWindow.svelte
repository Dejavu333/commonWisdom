<script>
    import { scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    //--------------------------------------------------
    // props
    //--------------------------------------------------
    export let visible = false;
    export let subTopic = "";
    let infoAboutSubTopic = "";

    $: readInfosByTopic(subTopic);

    $: if (visible) {
        window.addEventListener("keydown", closeInfoWindow);
    } else {
        window.removeEventListener("keydown", closeInfoWindow);
    }

    //--------------------------------------------------
    // functions
    //--------------------------------------------------
    import infos from "../../public/infos.json";  //todo ged infos from api by subTopic if the app gets bigger
    function readInfosByTopic(subTopic) {
        if (!subTopic) return;
        infos[subTopic] ? infoAboutSubTopic = infos[subTopic] : infoAboutSubTopic = "No infos about this subTopic yet";
    }

    function closeInfoWindow(event) {
        if (event.key === "Escape") {
            visible = false;
        }
    }

</script>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
{#if visible}
<div id="infosContainer" transition:scale={{ delay: 250, duration: 300, easing: quintOut }}>
    <button on:click={closeInfoWindow} title="esc">X</button>
    <h1>{subTopic}</h1>
    {infoAboutSubTopic}
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
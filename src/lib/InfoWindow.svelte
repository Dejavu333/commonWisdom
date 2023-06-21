<script>
    import { scale } from "svelte/transition";
    import infos from "../../public/infos.json";
    import { quintOut } from "svelte/easing";


    export let topic = "";
    export let visible = false;
    let infoAboutTheTopic = "";
    $: readInfosByTopic(topic);
    
    //todo ged infos from api by topic if the app gets bigger
    function readInfosByTopic(topic) {
        if (!topic) return;
        infos[topic] ? infoAboutTheTopic = infos[topic] : infoAboutTheTopic = "No infos about this topic yet";
    }

    function closeInfoWindow() {
        visible = false;
    }

    function handleWindowKeyDown(event) {
        if (event.key === "Escape") {
            closeInfoWindow();
        }
    }

    $: if (visible) {
        window.addEventListener("keydown", handleWindowKeyDown);
    } else {
        window.removeEventListener("keydown", handleWindowKeyDown);
    }
</script>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
{#if visible}
<div id="infosContainer" transition:scale={{ delay: 250, duration: 300, easing: quintOut }}>
    <button on:click={closeInfoWindow} title="esc">X</button>
    <h1>{topic}</h1>
    {infoAboutTheTopic}
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
        overflow: auto;
        padding: 20px;
    }
</style>
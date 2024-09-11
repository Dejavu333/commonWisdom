<script>

export let _Error = null;



</script>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
{#if _Error}
<main id="errorContainer">
    <h1>ERROR</h1>
    {#if _Error == "NO_TOPIC"}
        Please add a topic to the url like this: ?topic=topicName
    {:else if  _Error == "NON_EXISTING_TOPIC"}
        The topic you provided does not exist.
    {/if}
</main>
{/if}
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<style>
    #errorContainer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
</style>
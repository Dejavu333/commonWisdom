<script>
import { onMount } from 'svelte';

let showLoading = true;

onMount(() => {
  setTimeout(() => {
    showLoading = false;
  }, 2500);
});
</script>
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
{#if showLoading}
<div id="loadingCover">
    <div class="loading">
      <span id="C">C</span><span id="W">W</span>
    </div>

    <a id="repolink" href="https://github.com/Dejavu333/commonWisdom" target="_blank">commonWisdom repo</a>

</div>
{/if}
<!------------------------------------------------------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
<style>
#loadingCover {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: whitesmoke;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

#repolink { 
  position: fixed;
  bottom: 1%;
  text-decoration: none;
}

#C,#W { 
  font-family: 'Comfortaa', cursive; 
}

.loading {
  overflow: visible;
  font-size: 32px;
  display:flex;
  align-items: center;
  justify-content: center;
  background: whitesmoke;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 18px dashed var(--lightColor);
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
}
@keyframes spin {
  from {
    transform:rotate(-100deg);
  }
  to {
    transform:rotate(280deg);
  }
}

.loading:after {
  content: '';
  background: trasparent;
  width: 140%;
  height: 140%;
  position: absolute;
  border-radius: 100%;
  top: -20%;
  left: -20%;
  opacity: 0.7;
  box-shadow: var(--activeColor) -4px -5px 3px -3px;
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>

<script>
  import LoadingScreen from './components/LoadingScreen.svelte';
  import WisdomMap from './components/WisdomMap.svelte';

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Get the value of a specific parameter
  const TOPIC = urlParams.get('topic');
  console.log("topic is: " + TOPIC);

  </script>
  <!------------------------------------------------------------------------------------------------------->
  <!------------------------------------------------------------------------------------------------------->
  <LoadingScreen/>
  <WisdomMap _ChosenTopic={TOPIC}/>
  <!------------------------------------------------------------------------------------------------------->
  <!------------------------------------------------------------------------------------------------------->
  <style>
  
  </style>
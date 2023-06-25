<script>
  import WisdomMap from './components/WisdomMap.svelte';
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Get the value of a specific parameter
  const TOPIC = urlParams.get('topic');
  console.log("topic is: " + TOPIC);

  </script>
  <!------------------------------------------------------------------------------------------------------->
  <!------------------------------------------------------------------------------------------------------->
  <WisdomMap _ChosenTopic={TOPIC}/>
  <!------------------------------------------------------------------------------------------------------->
  <!------------------------------------------------------------------------------------------------------->
  <style>
  
  </style>
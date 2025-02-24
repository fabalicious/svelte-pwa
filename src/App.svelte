<script>
  import { onMount } from 'svelte';
  import { Workbox } from 'workbox-window';

  let isInstalled = false;

  onMount(async () => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/service-worker.js');
      
      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          console.log('Service Worker updated');
        } else {
          console.log('Service Worker installed');
          isInstalled = true;
        }
      });

      wb.register().catch((err) => {
        console.error('Failed to register service worker:', err);
      });
    }
  });
</script>

<main>
  <h1>Welcome to My Svelte PWA</h1>
  <p>This is a Progressive Web App built with Svelte!</p>
  {#if isInstalled}
    <p>✅ PWA is installed and ready to work offline</p>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
<template>
  <div class="home">
    <a-breadcrumb>
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href>Application Center</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <a href>Application List</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item>An Application</a-breadcrumb-item>
    </a-breadcrumb>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div id="components-button-demo-button-group">
      <h4>Basic</h4>
      <a-button-group>
        <a-button>Cancel</a-button>
        <a-button type="primary">OK</a-button>
      </a-button-group>
      <a-button-group>
        <a-button disabled>L</a-button>
        <a-button disabled>M</a-button>
        <a-button disabled>R</a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary">L</a-button>
        <a-button>M</a-button>
        <a-button>M</a-button>
        <a-button type="dashed">R</a-button>
      </a-button-group>

      <h4>With Icon</h4>
      <a-button-group>
        <a-button type="primary">
          <a-icon type="left" />Go back
        </a-button>
        <a-button type="primary">
          Go forward
          <a-icon type="right" />
        </a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary" icon="cloud" />
        <a-button type="primary" icon="cloud-download" />
      </a-button-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

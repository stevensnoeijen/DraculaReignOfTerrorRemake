<template>
  <Suspense>
    <n-message-provider>
      <router-view />
    </n-message-provider>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

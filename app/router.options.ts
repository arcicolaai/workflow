// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Scroll smoothly to the element with matching id
      return {
        el: to.hash,
        behavior: 'smooth',
        // Optional: offset if your navbar is fixed and covers part of the section
        // top: -80,   // e.g. if navbar height is ~74px + some margin
      }
    }

    // Default: scroll to top for normal page changes
    if (to.path !== from.path) {
      return { top: 0, behavior: 'smooth' }
    }

    // For browser back/forward, restore saved position
    return savedPosition || { top: 0 }
  },
}
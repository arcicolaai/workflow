# Code Architecture and Data Flow Explanation

## Overview
This application uses a **data-driven architecture** where all content is stored in a central data file (`site-data.ts`) and components dynamically render content from this data source.

## Data Flow Architecture

```
site-data.ts (Data Source)
    ↓
useSiteData() Composable (Data Access Layer)
    ↓
Components/Pages (UI Layer)
    ↓
Rendered HTML (User Interface)
```

## 1. Data Source: `data/site-data.ts`

**Purpose**: Central repository for all website content

**Structure**: A TypeScript object containing all site information:

```typescript
export default {
  site: { name, tagline, description },
  hero: { backgroundImage, title, buttons, ... },
  about: { title, paragraphs, image, button, colors, ... },
  features: [{ name, icon }, ...],
  navigation: { logo, links, contactButton },
  // ... more sections
}
```

**Key Points**:
- All text content, images, colors, and configuration are stored here
- Easy to update content without touching component code
- Single source of truth for all site data

## 2. Data Access Layer: `composables/useSiteData.ts`

**Purpose**: Provides a reusable way to access site data across components

```typescript
import siteData from '~/data/site-data'

export const useSiteData = () => {
  return {
    siteData
  }
}
```

**How it works**:
- Imports the data from `site-data.ts`
- Exports a composable function that returns the data
- Can be called in any Vue component using `const { siteData } = useSiteData()`

## 3. Component Usage Examples

### Example 1: Navbar Component (`components/Navbar.vue`)

```vue
<script setup>
const { siteData } = useSiteData()  // Access data
const mobileMenuOpen = ref(false)
</script>

<template>
  <!-- Use data in template -->
  <img :src="siteData.navigation.logo.image" />
  
  <ul>
    <li v-for="(link, index) in siteData.navigation.links" :key="index">
      <NuxtLink :to="link.to">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</template>
```

**Data Connection**:
- `siteData.navigation.logo.image` → Logo image path
- `siteData.navigation.links` → Array of navigation links
- `v-for` loops through the links array to render each link dynamically

### Example 2: Hero Section (`pages/index.vue`)

```vue
<script setup>
const { siteData } = useSiteData()
</script>

<template>
  <section>
    <h1>
      {{ siteData.hero.title }}
      <span>{{ siteData.hero.titleHighlight }}</span>
    </h1>
    <p>{{ siteData.hero.description }}</p>
    
    <!-- Dynamic buttons from data -->
    <button 
      v-for="(button, index) in siteData.hero.buttons" 
      :key="index"
    >
      {{ button.text }}
    </button>
  </section>
</template>
```

**Data Connection**:
- `siteData.hero.title` → "Your best work gets done"
- `siteData.hero.buttons` → Array of button objects
- `v-for` creates buttons dynamically based on data array

### Example 3: About Section

```vue
<template>
  <h2 :style="{ color: siteData.about.titleColor }">
    {{ siteData.about.title }}
  </h2>
  
  <p 
    v-for="(paragraph, index) in siteData.about.paragraphs" 
    :key="index"
    :style="{ color: siteData.about.textColor }"
  >
    {{ paragraph }}
  </p>
  
  <img :src="siteData.about.image" :alt="siteData.about.imageAlt" />
</template>
```

**Data Connection**:
- `siteData.about.paragraphs` → Array of text paragraphs
- `siteData.about.titleColor` → Dynamic color value
- `v-for` renders each paragraph from the array

## 4. Dynamic Rendering Patterns

### Pattern 1: Looping Through Arrays
```vue
<!-- Features array -->
<div v-for="(feature, index) in siteData.features" :key="index">
  <span>{{ feature.name }}</span>
  <icon :type="feature.icon" />
</div>
```

### Pattern 2: Conditional Rendering
```vue
<!-- Show badge only if it exists -->
<div v-if="announcement.badge">
  {{ announcement.badge.text }}
</div>
```

### Pattern 3: Dynamic Styling
```vue
<!-- Colors from data -->
<button :style="{ backgroundColor: siteData.about.buttonColor }">
  {{ siteData.about.button.text }}
</button>
```

### Pattern 4: Dynamic Attributes
```vue
<!-- Image source from data -->
<img :src="item.image" :alt="item.name" />
<NuxtLink :to="link.to">{{ link.text }}</NuxtLink>
```

## 5. Benefits of This Architecture

1. **Separation of Concerns**: Content (data) is separate from presentation (components)
2. **Easy Updates**: Change content in one file (`site-data.ts`) without touching component code
3. **Consistency**: All components use the same data source
4. **Maintainability**: Easy to add new sections or modify existing ones
5. **Reusability**: Components can be reused with different data

## 6. Data Structure Examples

### Navigation Data
```typescript
navigation: {
  logo: { image: "/images/logo.png" },
  links: [
    { text: "Home", to: "#hero" },
    { text: "About", to: "/aboutUs" },
    // ...
  ],
  contactButton: { text: "Contact Us", to: "/contact" }
}
```

### Product Cards Data
```typescript
bestSellingItems: {
  title: { prefix: "Our", highlight: "Best-Selling", suffix: "Items" },
  items: [
    {
      name: "Beef Nachos",
      price: "₱185",
      description: "Crispy nachos...",
      image: "/images/beef-nachos.jpg"
    },
    // ...
  ]
}
```

## 7. How Components Access Data

**Step 1**: Import the composable
```javascript
const { siteData } = useSiteData()
```

**Step 2**: Access nested properties
```javascript
siteData.navigation.logo.image
siteData.hero.buttons[0].text
siteData.about.paragraphs[1]
```

**Step 3**: Use in template
```vue
{{ siteData.hero.title }}
<img :src="siteData.about.image" />
<div v-for="item in siteData.bestSellingItems.items">
```

## Summary

The architecture follows this pattern:
1. **Data** stored in `site-data.ts` (TypeScript object)
2. **Composable** (`useSiteData`) provides access to data
3. **Components** call the composable to get data
4. **Templates** use Vue directives (`v-for`, `v-if`, `:bind`) to render data dynamically
5. **Result**: Fully dynamic, data-driven website where content can be updated by changing the data file


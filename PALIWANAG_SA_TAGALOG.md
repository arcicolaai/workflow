# Paliwanag ng Code at Data Connection (Tagalog)

## Pangkalahatang-ideya
Ang application na ito ay gumagamit ng **data-driven architecture** kung saan lahat ng content ay naka-store sa isang central data file (`site-data.ts`) at ang mga components ay dynamically nagre-render ng content mula sa data source na ito.

## Paano Kumokonekta ang Code sa Data

```
site-data.ts (Source ng Data)
    ↓
useSiteData() Composable (Access Layer)
    ↓
Components/Pages (UI Layer)
    ↓
Rendered HTML (Makikita ng User)
```

## 1. Data Source: `data/site-data.ts`

**Layunin**: Central repository para sa lahat ng website content

**Structure**: Isang TypeScript object na naglalaman ng lahat ng impormasyon:

```typescript
export default {
  site: { name, tagline, description },
  hero: { backgroundImage, title, buttons, ... },
  about: { title, paragraphs, image, button, colors, ... },
  features: [{ name, icon }, ...],
  navigation: { logo, links, contactButton },
  // ... iba pang sections
}
```

**Mahahalagang Punto**:
- Lahat ng text content, images, colors, at configuration ay naka-store dito
- Madaling i-update ang content nang hindi binabago ang component code
- Single source of truth para sa lahat ng site data

## 2. Data Access Layer: `composables/useSiteData.ts`

**Layunin**: Nagbibigay ng reusable na paraan para ma-access ang site data sa lahat ng components

```typescript
import siteData from '~/data/site-data'

export const useSiteData = () => {
  return {
    siteData
  }
}
```

**Paano ito gumagana**:
- Nag-i-import ng data mula sa `site-data.ts`
- Nag-e-export ng composable function na nagre-return ng data
- Pwedeng tawagin sa kahit anong Vue component gamit ang `const { siteData } = useSiteData()`

## 3. Halimbawa ng Component Usage

### Halimbawa 1: Navbar Component (`components/Navbar.vue`)

```vue
<script setup>
const { siteData } = useSiteData()  // Kunin ang data
const mobileMenuOpen = ref(false)
</script>

<template>
  <!-- Gamitin ang data sa template -->
  <img :src="siteData.navigation.logo.image" />
  
  <ul>
    <li v-for="(link, index) in siteData.navigation.links" :key="index">
      <NuxtLink :to="link.to">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</template>
```

**Data Connection**:
- `siteData.navigation.logo.image` → Path ng logo image
- `siteData.navigation.links` → Array ng navigation links
- `v-for` ay naglo-loop sa links array para i-render ang bawat link dynamically

### Halimbawa 2: Hero Section (`pages/index.vue`)

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
    
    <!-- Dynamic buttons mula sa data -->
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
- `siteData.hero.buttons` → Array ng button objects
- `v-for` ay gumagawa ng buttons dynamically base sa data array

### Halimbawa 3: About Section

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
- `siteData.about.paragraphs` → Array ng text paragraphs
- `siteData.about.titleColor` → Dynamic color value
- `v-for` ay nagre-render ng bawat paragraph mula sa array

## 4. Dynamic Rendering Patterns

### Pattern 1: Pag-loop sa Arrays
```vue
<!-- Features array -->
<div v-for="(feature, index) in siteData.features" :key="index">
  <span>{{ feature.name }}</span>
  <icon :type="feature.icon" />
</div>
```

**Paliwanag**: 
- `v-for` ay naglo-loop sa `siteData.features` array
- Para sa bawat feature, nagre-render ng `<div>` na may name at icon
- `:key="index"` ay kailangan para sa Vue's reactivity system

### Pattern 2: Conditional Rendering
```vue
<!-- Ipakita lang ang badge kung mayroon -->
<div v-if="announcement.badge">
  {{ announcement.badge.text }}
</div>
```

**Paliwanag**:
- `v-if` ay nagche-check kung may `badge` property ang announcement
- Kung mayroon, ipinapakita ang badge; kung wala, hindi ipinapakita

### Pattern 3: Dynamic Styling
```vue
<!-- Colors mula sa data -->
<button :style="{ backgroundColor: siteData.about.buttonColor }">
  {{ siteData.about.button.text }}
</button>
```

**Paliwanag**:
- `:style` ay nagbi-bind ng CSS style mula sa data
- `siteData.about.buttonColor` ay naglalaman ng color value (#7B7557)
- Ang button ay magkakaroon ng background color na galing sa data

### Pattern 4: Dynamic Attributes
```vue
<!-- Image source mula sa data -->
<img :src="item.image" :alt="item.name" />
<NuxtLink :to="link.to">{{ link.text }}</NuxtLink>
```

**Paliwanag**:
- `:src` ay nagbi-bind ng image path mula sa data
- `:to` ay nagbi-bind ng link destination mula sa data
- Ang `:` ay shorthand para sa `v-bind` directive

## 5. Benefits ng Architecture na Ito

1. **Separation of Concerns**: Ang content (data) ay hiwalay sa presentation (components)
2. **Madaling Update**: Baguhin lang ang content sa isang file (`site-data.ts`) nang hindi binabago ang component code
3. **Consistency**: Lahat ng components ay gumagamit ng parehong data source
4. **Maintainability**: Madaling magdagdag ng bagong sections o baguhin ang existing
5. **Reusability**: Ang components ay pwedeng gamitin ulit sa ibang data

## 6. Halimbawa ng Data Structure

### Navigation Data
```typescript
navigation: {
  logo: { image: "/images/logo.png" },
  links: [
    { text: "Home", to: "#hero" },
    { text: "About", to: "/aboutUs" },
    { text: "Our Space", to: "/our-space" },
    { text: "Menu", to: "/menu" },
    { text: "Announcements", to: "/announcements" }
  ],
  contactButton: { text: "Contact Us", to: "/contact" }
}
```

**Paano ginagamit**:
- Sa Navbar component, `siteData.navigation.links` ay naglalaman ng lahat ng navigation links
- `v-for` ay naglo-loop sa links array para gumawa ng navigation menu items
- Bawat link ay may `text` (ipinapakita) at `to` (destination URL)

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
    // ... iba pang items
  ]
}
```

**Paano ginagamit**:
- Sa index.vue, `siteData.bestSellingItems.items` ay naglalaman ng lahat ng products
- `v-for` ay naglo-loop sa items array para gumawa ng product cards
- Bawat card ay may name, price, description, at image na galing sa data

## 7. Step-by-Step: Paano Kumokonekta ang Component sa Data

### Hakbang 1: Import ang Composable
```javascript
const { siteData } = useSiteData()
```

**Paliwanag**: 
- `useSiteData()` ay isang composable function na nagre-return ng `siteData` object
- Ang `siteData` ay naglalaman ng lahat ng data mula sa `site-data.ts`

### Hakbang 2: Access ang Nested Properties
```javascript
// Access ng nested properties
siteData.navigation.logo.image          // Path ng logo
siteData.hero.buttons[0].text           // Text ng unang button
siteData.about.paragraphs[1]           // Pangalawang paragraph
siteData.bestSellingItems.items[2]    // Pangatlong product item
```

**Paliwanag**:
- Gamit ang dot notation (`.`) para ma-access ang nested properties
- Gamit ang bracket notation (`[0]`) para ma-access ang array elements

### Hakbang 3: Gamitin sa Template
```vue
<!-- Text interpolation -->
{{ siteData.hero.title }}

<!-- Attribute binding -->
<img :src="siteData.about.image" />

<!-- Loop through arrays -->
<div v-for="item in siteData.bestSellingItems.items">
  <h3>{{ item.name }}</h3>
  <p>{{ item.price }}</p>
</div>

<!-- Conditional rendering -->
<div v-if="siteData.about.overlayText">
  {{ siteData.about.overlayText }}
</div>
```

## 8. Real-World Example: Navigation Menu

### Sa `site-data.ts`:
```typescript
navigation: {
  links: [
    { text: "Home", to: "#hero" },
    { text: "About", to: "/aboutUs" },
    { text: "Our Space", to: "/our-space" }
  ]
}
```

### Sa `Navbar.vue`:
```vue
<script setup>
const { siteData } = useSiteData()  // 1. Kunin ang data
</script>

<template>
  <ul>
    <!-- 2. Loop sa links array -->
    <li v-for="(link, index) in siteData.navigation.links" :key="index">
      <!-- 3. Gamitin ang data properties -->
      <NuxtLink :to="link.to">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</template>
```

### Result:
```html
<!-- Rendered HTML -->
<ul>
  <li><a href="#hero">Home</a></li>
  <li><a href="/aboutUs">About</a></li>
  <li><a href="/our-space">Our Space</a></li>
</ul>
```

## 9. Paano Gumagana ang Vue Directives

### `v-for` - Para sa Looping
```vue
<div v-for="(item, index) in siteData.items" :key="index">
  {{ item.name }}
</div>
```

**Paliwanag**:
- `v-for` ay naglo-loop sa array
- `(item, index)` ay ang current item at index
- `:key="index"` ay kailangan para sa Vue's reactivity

### `v-if` - Para sa Conditional
```vue
<div v-if="siteData.showSection">
  Content dito
</div>
```

**Paliwanag**:
- `v-if` ay nagche-check kung true ang condition
- Kung true, ipinapakita; kung false, hindi ipinapakita

### `:bind` - Para sa Dynamic Attributes
```vue
<img :src="siteData.image" :alt="siteData.alt" />
```

**Paliwanag**:
- `:src` ay nagbi-bind ng `src` attribute sa value mula sa data
- Parehong `:alt` ay nagbi-bind ng `alt` attribute

### `{{ }}` - Para sa Text Interpolation
```vue
<h1>{{ siteData.title }}</h1>
```

**Paliwanag**:
- `{{ }}` ay nagdi-display ng value mula sa data
- Parehong value ay naka-bind, kaya kapag nagbago ang data, magbabago din ang display

## 10. Summary (Buod)

**Ang architecture ay sumusunod sa pattern na ito**:

1. **Data** → Naka-store sa `site-data.ts` (TypeScript object)
2. **Composable** → `useSiteData()` ay nagbibigay ng access sa data
3. **Components** → Tumatawag sa composable para makuha ang data
4. **Templates** → Gumagamit ng Vue directives (`v-for`, `v-if`, `:bind`) para i-render ang data dynamically
5. **Result** → Fully dynamic, data-driven website kung saan ang content ay pwedeng i-update sa pamamagitan ng pagbabago sa data file

**Key Takeaway**:
- Lahat ng content ay nasa `site-data.ts`
- Ang components ay nagre-render ng content mula sa data
- Walang hardcoded na content sa components
- Madaling mag-update ng content sa pamamagitan ng pagbabago sa data file lang


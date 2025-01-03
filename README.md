# Apollo Template for ApostropheCMS + Astro integration

This is intended as both a template and starting point for a project with an [ApostropheCMS](https://docs.apostrophecms.org/) backend and frontend powered by [Astro](https://astro.build/).

The ApostropheCMS codebase is located in the `backend` folder of the repository, while the Astro codebase is in the `frontend` folder.

## Introduction
Overall, this project utilizes ApostropheCMS as a headless backend with Astro as a frontend. What sets this apart from the typical headless use of ApostropheCMS is the addition of a package, [apostrophe-astro](https://github.com/apostrophecms/apostrophe-astro) in the Astro frontend project. This allows for full use of the ApostropheCMS Admin UI, including in-context editing. At the same time, this package also largely automates and simplifies fetching content from the ApostropheCMS backend without writing REST API calls into your code.

## Using this project

### Prerequisites
- Node.js v20 or later
- MongoDB v6.0 or later running on a local server or access to Atlas. See the [ApostropheCMS documentation](https://docs.apostrophecms.org/guide/development-setup.html) for set-up details.

### Getting Started
The codebases located in the `backend` and `frontend` folders should be treated as interlinked but separate projects.

To simplify dependency management, this repository includes several root-level scripts for convenience. The `postinstall` script automatically installs dependencies for both the `frontend` and `backend` folders when you run `npm install` at the root. Additionally, you can use the update script to run `npm update` in both codebases, and the `build` script to build both projects.

#### For local Development
- To start, execute `npm install` from a terminal in the root of this repo
- Next, open a terminal instance at the root of each folder (`frontend` and `backend`). Each project needs to be provided with an `APOS_EXTERNAL_FRONT_KEY` environment variable set to the same string value in order to authenticate communication. For example, in each terminal execute `export APOS_EXTERNAL_FRONT_KEY=my-secret-key`.
- The `astro.config.mjs` file is already set to the normal default values, but if you are running the backend server on a different port, you will also have to set the `APOS_HOST` environment variable.
- Then, you can start the projects using the accompanying scripts. For example, in a local development environment you can start each with `npm run dev`.

### Similarities to a stand-alone ApostropheCMS project
If you have worked with an ApostropheCMS project previously, the backend repo should look as expected. There are a number of custom modules, providing new pages, pieces, and widgets, located in the `modules` folder. The project also configures several Apostrophe core modules through code located in the `modules/@apostrophecms` folder. For a full understanding of Apostrophe you should consult the [documentation](https://docs.apostrophecms.org/), but we will touch on a few highlights later in this document.

Like any ApostropheCMS project, after creating a new module it needs to be registered in the `app.js` file. Page types need to be added to the `types` option of the `modules/@apostrophecms/page/index.js` file.

The majority of [module configuration settings](https://docs.apostrophecms.org/reference/module-api/module-overview.html#module-configuration) will continue to operate as normal since they are involved in configuring the behavior and functionality of the Admin UI, request routing, which is still being handled by the ApostropheCMS backend server, or interaction with MongoDB.

### Important ApostropheCMS differences
Where this project differs from a normal ApostropheCMS project is that no frontend code should be included in your modules. So, client-side JavaScript and styling, normally added to the `modules/custom-module/ui/src` folder will now be included in the Astro project. This also includes templates in the `views` folder of most modules. One exception is the `modules/@apostrophecms/home-page` module. This module provides a "fall-back" for users who navigate to the Apostrophe server (located by default at `localhost:3000` during development) and simply loads the core `views/layout.html` file. This core file has been modified in this project to provide info about the local project status and not load any of the ApostropheCMS Admin UI.

Equally, certain [module customization functions](https://docs.apostrophecms.org/reference/module-api/module-overview.html#customization-functions) that deal with front-end functionality should not be used. This includes the `helper()` and `extendHelpers()` functions for providing Nunjucks template helpers, the `components()` method that provide asynchronous template components, and the `renderRoutes()` function to return a rendered template.

Unlike an ApostropheCMS only project, using Astro as a frontend allows for the widget templates to be used outside specialized `area` schema fields. This provides flexibility for page design without code repetition. However, this means that the widget schema fields for adding content also need to be added to the schema fields of the page. To facilitate this, some of the widget schema fields have been moved to the `lib/schema-mixins` folder. This allows them to be imported and used in both the main widget module and in the home page template.

### Similarities to a stand-alone Astro project
The Astro half of this project has standard components and templates, adhering to typical Astro conventions Organization should follow the normal Astro standards, with the majority of your code being served from sub-folders located in the `src` folder and client-side assets from the `public` folder. If you are new to Astro, refer to the [official documentation](https://docs.astro.build/en/getting-started/) to get started.

Configuration is managed through the `astro.config.mjs` file, following standard practices. However, certain settings must remain unchanged to integrate seamlessly with the ApostropheCMS backend. This includes including the `apostrophe` extension in the `integrations` and the `output` as `server`. You can read more in the [`astro-apostrophe` exension documentation](https://github.com/apostrophecms/apostrophe-astro). But, for example, this project is using a different SASS compiler through the `preprocessorOptions` property for compatibility with the [Bulma CSS framework](https://bulma.io/).

### Important Astro differences
Unlike an Astro project with multiple routes in the `pages` folder, this project has a single slug.astro route that handles all the routing using pages mapped to the `templates` folder. Each of the templates corresponds to one of the registered ApostropheCMS page or piece-page types. The content of these templates is populated by data from the CMS backend and is added into the slots in the `[...slug].astro` file. There is also a `widgets` folder containing templates for the ApostropheCMS widgets. The ApostropheCMS page and widget types are mapped to the corresponding ApostropheCMS modules through an `index.js` file in each folder.

## Project highlights
This project is more opinionated than some of our other project starter kits. It uses the [Bulma CSS framework](https://bulma.io/). For a more streamlined starting point you can use the [combined-astro-starter-kit](https://github.com/apostrophecms/combined-astro-starter-kit) repository.

### Widgets
This project provides the core ApostropheCMS widgets, plus seven additional widgets:

- Layout
    - rows-widget: adds rows with varying numbers of columns for responsive content layout
    - grid-layout-widget: adds custom or predefined CSS grid-based layouts
- Content
    - hero-widget: a customizable hero section with options for color gradient, image, or video backgrounds
    - slideshow-widget: a customizable slideshow widget
    - accordion-widget: adds an accordion for organizing content into collapsible sections
    - card-widget: allows for the creation of multiple different customizable card-types
    - link-widget: adds links that can be styled as text or a highly customizable button

### Pieces
This project creates two pieces. The first is an `article` piece for the creation of content pieces like blog posts or news articles. The second is an `author` piece that is used in relationship with the article pieces.

### Pages
This project creates core `default` and `@apostrophecms/home-page` pages. It also creates two pages for displaying the article pieces.

The home-page has three potential layouts selected from the utility menus on the right-side of the page manager. The 'Minimal' layout inherits the header and footer components that is added to all the project pages. It also has a single area that can take any of the project widgets. The 'Foundation' layout adds a hero section at the top of the page, while the 'Showcase' adds a slideshow.

The default page has a layout that is identical to the 'Minimal' home-page layout.

Piece-type pages in ApostropheCMS only projects are used to either display multiple pieces (`index.html`) or individual pieces (`show.html`). This project has both types of pages, mapping the index of all pieces to the `ArticleIndexPage.astro` template and the display of the individual pieces to the `ArticleShowPage.astro` template. Both of these page types have three layouts for you to select from. Depending on the index layout, there are three or four additional areas for adding widgets with content before and after the piece content. The index page also demonstrates how to handle pagination in a hybrid project.

# Image Helper Functions

## Overview
These helper functions are designed to work with images in your Astro frontend that come from ApostropheCMS through relationships or attachment fields. If you're using the image widget within an area, you should use the `AposArea` helper instead - these utilities are specifically for handling images that are part of your content model.

## Common Use Cases

### Working with Image Relationships
When you have a relationship field to `@apostrophecms/image` in your content type, you'll typically need to:
1. Get the image URL (potentially at different sizes for responsive images)
2. Get the image dimensions including any cropping that should be applied
3. Set up proper alt text
4. Handle focal points if configured

Here's a typical example:
```js
---
// PATH assumes you are importing from a subfolder of the `src` folder
import {
  getFirstAttachment,
  getAttachmentUrl,
  getAttachmentSrcset,
  hasFocalPoint,
  getFocalPoint,
  getWidth,
  getHeight
} from '../lib/attachments.js';

// relationshipField._image comes from your schema
const image = relationshipField._image;

// If you have an array of images, you might need getFirstAttachment
const image = getFirstAttachment(relationshipField._images);
---

<img
  src={getAttachmentUrl(image, { size: 'full' })}
  srcset={getAttachmentSrcset(image)}
  sizes="(max-width: 800px) 100vw, 800px"
  alt={image.alt || image.title || 'Image description'}
  width={getWidth(image)}
  height={getHeight(image)}
/>
```

### Working with Direct Attachments
For attachment fields (like logo fields), the pattern is similar, but you don't need to use `getFirstAttachment` since the field already contains the direct attachment:

```js
<img 
  src={getAttachmentUrl(attachmentField)}
  width={getWidth(attachmentField)}
  height={getHeight(attachmentField)}
  alt="Logo"
/>
```

## Image Cropping and Sizes

### Automatic Crop Handling
If you set a crop region for an image in the ApostropheCMS Admin UI, all the helper methods will automatically respect that crop. You don't need to do anything special in your code - the cropped version will be used when generating URLs and srcsets.

### Size Variants
The default size variants are:
- `one-sixth` (190×350px)
- `one-third` (380×700px)
- `one-half` (570×700px)
- `two-thirds` (760×760px)
- `full` (1140×1140px)
- `max` (1600×1600px)

These sizes will be used to generate the srcset and can be selected by name for the `getAttachmentUrl()` method:

```
getAttachmentUrl(image, { size: 'full' })
```

You can use custom size names in both `getAttachmentUrl()` and the srcset options. For example:
```js
const customUrl = getAttachmentUrl(image, { size: 'custom-banner' });

// Custom srcset configuration
const srcset = getAttachmentSrcset(image, {
  sizes: [
    { name: 'small', width: 300 },
    { name: 'medium', width: 600 },
    { name: 'large', width: 900 },
  ]
});
```

Important: These helpers don't generate the image sizes - they just reference sizes that already exist. To use custom sizes, you must configure the [`@apostrophecms/attachment` module](https://docs.apostrophecms.org/reference/modules/attachment.html#configuration) to create those sizes when images are uploaded. You can do this in your backend configuration:

```javascript
// modules/@apostrophecms/attachment/index.js
module.exports = {
  options: {
    // Define what sizes should be created on upload
    imageSizes: {
      'custom-banner': { width: 1200, height: 400 },
      'square-thumb': { width: 300, height: 300 },
      'small': { width: 300 },
      'medium': { width: 600 },
      'large': { width: 900 }
    }
  }
};
```

See the [attachment module documentation](https://docs.apostrophecms.org/reference/modules/attachment.html#configuration) for complete configuration options.

### Focal Points
If you've set focal points in the ApostropheCMS admin UI, you can use them:

```js
<img
  src={getAttachmentUrl(image)}
  style={
    hasFocalPoint(image)
      ? `object-position: ${getFocalPoint(image)};`
      : 'object-position: center center'
  }
/>
```

## Core Functions Reference
There are JSDocs blocks for the core function that can be used for a more detailed explanation, but as a quick summary:
- `getAttachmentUrl(attachment, options?)`: Get URL for an image with optional size (defaults to 'full')
- `getAttachmentSrcset(attachment, options?)`: Generate responsive srcset string
- `getWidth(attachment)`: Get image width
- `getHeight(attachment)`: Get image height
- `getFirstAttachment(attachments)`: Get first image from an array

# Deploying to production

## Using Apostrophe hosting

Apostrophe can provide easy hosting for any ApostropheCMS-Astro monorepo with little or no extra configuration. This can be setup for deployment from Github or other code repository.

1. Sign up for an Apostrophe Cloud account at [app.apostrophecms.com](app.apostrophecms.com)
2. Connect your repository using Github integration or another supported version control system
3. Configure your deployment settings in the Apostrophe Cloud dashboard:
   - Set your environment variables
   - Configure your domain settings
   - Set up your SSL certificates
4. Deploy your project using the provided deployment commands or automatic deployment triggers

Apostrophe hosting will automatically handle:
- Database provisioning and management
- Asset storage and delivery
- SSL certificate management
- Automatic backups
- Security updates

## Using 3rd-party hosting

Third-party hosting will typically require separate servers for the ApostropheCMS and Astro portions of the repositories. This is the typical pattern seen with other CMS that are used with Astro. You will need to specify whether you want the `backend` ApostropheCMS portion of the repo, or the `frontend` Astro project hosted. How this is accomplished will depend on the provider.

### Backend (ApostropheCMS) Deployment

Your ApostropheCMS backend requires:
- Node.js environment (v20 or later recommended)
- MongoDB database
- Asset storage solution (cloud storage like AWS S3)
- Environment variables properly 

There are several examples of common deployment strategies in our [documentation](https://docs.apostrophecms.org/guide/hosting.html)

Example deployment steps for a typical provider:
1. Set up a MongoDB instance (Atlas, DigitalOcean, etc.)
2. Configure your server with Node.js and PM2
3. Set up your environment variables:
   ```bash
   NODE_ENV=production
   APOS_MONGODB_URI=YOUR_mongodb_connection_string
   APOS_EXTERNAL_FRONT_KEY=a_random_string
   APOS_S3_BUCKET=YOUR-bucket-name
   APOS_S3_SECRET=YOUR-s3-secret
   APOS_S3_KEY=YOUR-s3-key
   APOS_S3_REGION=YOUR-chosen-region
   ```
The remainder of the deployment will depend on the hosting platform being used and how that deployment is triggered. Generally, it will comprise a build step followed by bringing up the server. If you are not deploying with Git, you will also need to set the `APOS_RELEASE_ID` to a unique, random value. Again, make sure that you specify that the `backend` folder is to be used as the root for your deployment.

### Frontend (Astro) Deployment

Your Astro frontend can be deployed to any static hosting provider that supports SSR (Server-Side Rendering). Popular options include:
- Netlify
- Vercel
- Cloudflare Pages
- AWS Amplify
There are a number of tutorials in the [Astro documentation](https://docs.astro.build/en/guides/deploy/#deployment-guides) to use as a starting point. The only modifications are the extra environment variable, `APOS_EXTERNAL_FRONT_KEY=a_random_string` set to the same string as your backend project, and to make sure that you are specifying the `frontend` folder as the root of the project.

#### Netlify Deployment Example

1. Log in to your [Netlify](https://www.netlify.com/) account.
2. Create a new site by connecting your Git repository.
3. In the "Build settings" configuration:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Access Site Settings:
   -Navigate to the "Site settings" for the selected site.
5. Scroll down and find the "Environment variables" section under the "Build & deploy" tab. Click "Edit variables". Add a New Variable:
   - **Key**: `APOS_EXTERNAL_FRONT_KEY`
   - **Value**: `a_random_string`
6. Save your configuration and deploy the site.

The build settings can also be supplied through a `netlify.toml` file at the root of your project.
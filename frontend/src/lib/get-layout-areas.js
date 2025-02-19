/**
 * @typedef {Object} LayoutArea
 * @property {string} name - Area name
 * @property {*} content - Area content
 * @property {number} colStart - Starting column
 * @property {number} colSpan - Column span
 * @property {number} rowStart - Starting row
 * @property {number} rowSpan - Row span
 * @property {number} [tabletColSpan] - Tablet column span
 * @property {number} [mobileColSpan] - Mobile column span
 */

/**
 * @typedef {Object} CustomGrid
 * @property {LayoutArea[]} contentAreas
 */

/**
 * @typedef {Object} Widget
 * @property {('asideMainThree'|'mainAsideThree'|'asideTwoMain'|'twoMainAside'|'headerTwoColFooter'|'featuredThreeGrid'|'magazineLayout'|'contentHub'|'galleryMasonry'|'dashboardLayout'|'productShowcase'|'custom')} layoutType
 * @property {CustomGrid} [customGrid]
 * @property {Record<string, any>} [content] - Dynamic content properties
 */


export const getLayoutAreas = (widget) => {
  switch (widget.layoutType) {
    case 'asideMainThree':
      return [
        {
          name: 'aside',
          content: widget.asideContent,
          colStart: 1,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 5,
          mobileColSpan: 12,
        },
        {
          name: 'main',
          content: widget.mainContent,
          colStart: 5,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 7,
          mobileColSpan: 12,
        },
      ];

    case 'mainAsideThree':
      return [
        {
          name: 'main',
          content: widget.mainContent,
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 7,
          mobileColSpan: 12,
        },
        {
          name: 'aside',
          content: widget.asideContent,
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 5,
          mobileColSpan: 12,
        },
      ];

    case 'asideTwoMain':
      return [
        {
          name: 'aside',
          content: widget.asideLongContent,
          colStart: 1,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 4,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'main-top',
          content: widget.mainTopContent,
          colStart: 5,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'main-bottom',
          content: widget.mainBottomContent,
          colStart: 5,
          colSpan: 8,
          rowStart: 3,
          rowSpan: 2,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'twoMainAside':
      return [
        {
          name: 'main-top',
          content: widget.mainTopContent,
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'main-bottom',
          content: widget.mainBottomContent,
          colStart: 1,
          colSpan: 8,
          rowStart: 3,
          rowSpan: 2,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'aside',
          content: widget.asideLongContent,
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 4,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'headerTwoColFooter':
      return [
        {
          name: 'header',
          content: widget.headerContent,
          colStart: 1,
          colSpan: 12,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'left',
          content: widget.leftColumnContent,
          colStart: 1,
          colSpan: 6,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'right',
          content: widget.rightColumnContent,
          colStart: 7,
          colSpan: 6,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'footer',
          content: widget.footerContent,
          colStart: 1,
          colSpan: 12,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'featuredThreeGrid':
      return [
        {
          name: 'featured',
          content: widget.featuredContent,
          colStart: 1,
          colSpan: 12,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'col1',
          content: widget.columnOneContent,
          colStart: 1,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'col2',
          content: widget.columnTwoContent,
          colStart: 5,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'col3',
          content: widget.columnThreeContent,
          colStart: 9,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'magazineLayout':
      return [
        {
          name: 'headline',
          content: widget.headlineContent,
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'sidebar',
          content: widget.sidebarContent,
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 3,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'feature1',
          content: widget.feature1Content,
          colStart: 1,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'feature2',
          content: widget.feature2Content,
          colStart: 5,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'feature3',
          content: widget.feature3Content,
          colStart: 9,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
      ];

    case 'contentHub':
      return [
        {
          name: 'hero',
          content: widget.heroContent,
          colStart: 1,
          colSpan: 12,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'featured',
          content: widget.featuredHubContent,
          colStart: 1,
          colSpan: 8,
          rowStart: 2,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'quickLinks',
          content: widget.quickLinksContent,
          colStart: 9,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 2,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'section1',
          content: widget.section1Content,
          colStart: 1,
          colSpan: 6,
          rowStart: 4,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'section2',
          content: widget.section2Content,
          colStart: 7,
          colSpan: 6,
          rowStart: 4,
          rowSpan: 1,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'fullWidth',
          content: widget.fullWidthContent,
          colStart: 1,
          colSpan: 12,
          rowStart: 5,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'galleryMasonry':
      return [
        {
          name: 'featured',
          content: widget.galleryFeaturedContent,
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'side1',
          content: widget.gallerySide1Content,
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 6,
        },
        {
          name: 'side2',
          content: widget.gallerySide2Content,
          colStart: 9,
          colSpan: 4,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 6,
        },
        {
          name: 'bottom',
          content: widget.galleryBottomContent,
          colStart: 1,
          colSpan: 12,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'dashboardLayout':
      return [
        {
          name: 'mainMetric',
          content: widget.mainMetricContent,
          colStart: 1,
          colSpan: 8,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 8,
          mobileColSpan: 12,
        },
        {
          name: 'sideMetrics',
          content: widget.sideMetricsContent,
          colStart: 9,
          colSpan: 4,
          rowStart: 1,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'chart',
          content: widget.chartContent,
          colStart: 1,
          colSpan: 6,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
        {
          name: 'table',
          content: widget.tableContent,
          colStart: 7,
          colSpan: 6,
          rowStart: 2,
          rowSpan: 1,
          tabletColSpan: 12,
          mobileColSpan: 12,
        },
      ];

    case 'productShowcase':
      return [
        {
          name: 'mainProduct',
          content: widget.mainProductContent,
          colStart: 1,
          colSpan: 6,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'details',
          content: widget.productDetailsContent,
          colStart: 7,
          colSpan: 6,
          rowStart: 1,
          rowSpan: 2,
          tabletColSpan: 6,
          mobileColSpan: 12,
        },
        {
          name: 'related1',
          content: widget.related1Content,
          colStart: 1,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'related2',
          content: widget.related2Content,
          colStart: 5,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
        {
          name: 'related3',
          content: widget.related3Content,
          colStart: 9,
          colSpan: 4,
          rowStart: 3,
          rowSpan: 1,
          tabletColSpan: 4,
          mobileColSpan: 12,
        },
      ];

    case 'custom':
    default:
      return widget.customGrid.contentAreas.map((area) => ({
        ...area,
        tabletColSpan: area.tabletColSpan || area.colSpan,
        mobileColSpan: 12,
      }));
  }
};

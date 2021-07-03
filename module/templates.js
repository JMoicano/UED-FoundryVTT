export const preloadHandlebarsTemplates = async () => {
  const templatePaths = [
    // "systems/worldbuilding/templates/parts/sheet-attributes.html",
    // "systems/worldbuilding/templates/parts/sheet-groups.html"
  ];

  return loadTemplates(templatePaths);
};
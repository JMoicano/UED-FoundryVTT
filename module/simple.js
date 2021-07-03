// Import Modules
import { SimpleActorSheet } from "./actor-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async () => {
  console.log(`Initializing Simple ued System`);

  CONFIG.Combat.initiative = {formula: "1d20", decimals: 2};

  game.ued = {};

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("ued", SimpleActorSheet, { makeDefault: true });

  // Items.unregisterSheet("core", ItemSheet);
  // Items.registerSheet("ued", SimpleItemSheet, { makeDefault: true });


  Handlebars.registerHelper('slugify', (value) => value.slugify({strict: true}));
  Handlebars.registerHelper('localize', (value) => game.i18n.localize(value));
  
  await preloadHandlebarsTemplates();
});

/**
 * Macrobar hook.
 */
// Hooks.on("hotbarDrop", (bar, data, slot) => createUedMacro(data, slot));

/**
 * Adds the actor template context menu.
 */
Hooks.on("getActorDirectoryEntryContext", (html, options) => {
  // Define an actor as a template.
  options.push({
    name: `game.i18n.localize("SIMPLE.DefineTemplate")`,
    icon: '<i class="fas fa-stamp"></i>',
    condition: li => {
      const actor = game.actors.get(li.data("entityId"));
      return !actor.getFlag("ued", "isTemplate");
    },
    callback: li => {
      const actor = game.actors.get(li.data("entityId"));
      actor.setFlag("ued", "isTemplate", true);
    }
  });

  // Undefine an actor as a template.
  options.push({
    name: `game.i18n.localize("SIMPLE.UnsetTemplate")`,
    icon: '<i class="fas fa-times"></i>',
    condition: li => {
      const actor = game.actors.get(li.data("entityId"));
      return actor.getFlag("ued", "isTemplate");
    },
    callback: li => {
      const actor = game.actors.get(li.data("entityId"));
      actor.setFlag("ued", "isTemplate", false);
    }
  });
});

/**
 * Adds the item template context menu.
 */
Hooks.on("getItemDirectoryEntryContext", (html, options) => {
  // Define an item as a template.
  options.push({
    name: game.i18n.localize("SIMPLE.DefineTemplate"),
    icon: '<i class="fas fa-stamp"></i>',
    condition: li => {
      const item = game.items.get(li.data("entityId"));
      return !item.getFlag("ued", "isTemplate");
    },
    callback: li => {
      const item = game.items.get(li.data("entityId"));
      item.setFlag("ued", "isTemplate", true);
    }
  });

  // Undefine an item as a template.
  options.push({
    name: game.i18n.localize("SIMPLE.UnsetTemplate"),
    icon: '<i class="fas fa-times"></i>',
    condition: li => {
      const item = game.items.get(li.data("entityId"));
      return item.getFlag("ued", "isTemplate");
    },
    callback: li => {
      const item = game.items.get(li.data("entityId"));
      item.setFlag("ued", "isTemplate", false);
    }
  });
});

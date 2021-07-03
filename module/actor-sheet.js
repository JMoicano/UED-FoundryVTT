
export class SimpleActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["worldbuilding", "sheet", "actor"],
      template: "systems/ued/templates/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      scrollY: [".biography", ".items", ".attributes"],
      dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }

  getData(data) {
    const context = super.getData(data)
    console.log('[SimpleActorSheet.getData]', context);
    return context;
  }
}

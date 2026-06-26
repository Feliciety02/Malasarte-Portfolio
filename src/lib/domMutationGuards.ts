const DOM_GUARDS_PATCHED = "__feAnneDomMutationGuardsPatched__";

type PatchedNodeConstructor = typeof Node & {
  [DOM_GUARDS_PATCHED]?: boolean;
};

export function installDomMutationGuards() {
  if (typeof window === "undefined" || typeof Node === "undefined") return;

  const patchedNode = Node as PatchedNodeConstructor;
  if (patchedNode[DOM_GUARDS_PATCHED]) return;

  const originalRemoveChild = Node.prototype.removeChild;
  const originalInsertBefore = Node.prototype.insertBefore;

  Node.prototype.removeChild = function removeChildPatched<T extends Node>(child: T) {
    if (!child || child.parentNode !== this) return child;

    try {
      return originalRemoveChild.call(this, child) as T;
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotFoundError") {
        return child;
      }
      throw error;
    }
  };

  Node.prototype.insertBefore = function insertBeforePatched<T extends Node>(
    newNode: T,
    referenceNode: Node | null,
  ) {
    if (!newNode) return newNode;

    if (referenceNode && referenceNode.parentNode !== this) {
      this.appendChild(newNode);
      return newNode;
    }

    try {
      return originalInsertBefore.call(this, newNode, referenceNode) as T;
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === "NotFoundError" || error.name === "HierarchyRequestError")
      ) {
        try {
          this.appendChild(newNode);
        } catch {
          /* safely skip if appendChild also fails */
        }
        return newNode;
      }
      throw error;
    }
  };

  patchedNode[DOM_GUARDS_PATCHED] = true;
}

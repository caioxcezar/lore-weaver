export const hasNode = (source: Element, target: Element) => {
  const memory = { has: false };
  _hasNode(source, target, memory);
  return memory.has;
};

const _hasNode = (
  source: Element,
  target: Element,
  memory: { has: boolean }
) => {
  if (memory.has) return;
  if (source === target) {
    memory.has = true;
    return;
  }
  for (const child of source.children) _hasNode(child, target, memory);
};

// Types Action Creator Function
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}
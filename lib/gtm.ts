/**
 * Utilitário para enviar eventos ao Google Tag Manager.
 * Use após configurar NEXT_PUBLIC_GTM_ID no .env
 */

export function pushDataLayer(data: Record<string, unknown>): void {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(data);
  }
}

/**
 * Exemplo: pushEvent('cta_click', { section: 'hero', label: 'whatsapp' })
 */
export function pushEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  pushDataLayer({
    event: eventName,
    ...params,
  });
}

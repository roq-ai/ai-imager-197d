const mapping: Record<string, string> = {
  organizations: 'organization',
  'text-documents': 'text_document',
  users: 'user',
  videos: 'video',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

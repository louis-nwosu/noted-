export interface UnfurlResult {
  title: string;
  description: string;
  favicon: string;
  domain: string;
  image: string | null;
}

export async function unfurlUrl(url: string): Promise<UnfurlResult> {
  const domain = new URL(url).hostname;
  return {
    title: domain,
    description: '',
    favicon: `https://${domain}/favicon.ico`,
    domain,
    image: null,
  };
}

export default function extractIdentifier(url: string) {
  const regex = /\/([^\/]+)\.ipfs/;
  const match = url.match(regex);
  if (match) {
    const extractedString = match[1];
    return 'https://ipfs.io/ipfs/' + extractedString;
  } else {
    return 'https://ipfs.io/ipfs/bafkreibufkhlr6kaq4mhb4tpczbwtzm7jx2q7nrnwed2ndk6klrv6da54u';
  }
}

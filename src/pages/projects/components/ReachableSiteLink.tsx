import React from "react";
import { useUrlReachable } from "../../../hooks/useUrlReachable";

interface ReachableSiteLinkProps {
  url: string;
  children: (url: string) => React.ReactElement;
}

/**
 * Renders its child link only while `url` is believed to work. A background
 * reachability check (see useUrlReachable) hides the link once it is proven
 * to return an HTTP error response, so a project's "Site"/"Demo" button never
 * lingers pointing at a dead page.
 */
const ReachableSiteLink: React.FC<ReachableSiteLinkProps> = ({
  url,
  children,
}) => {
  const reachable = useUrlReachable(url);
  if (!reachable) return null;
  return children(url);
};

export default ReachableSiteLink;

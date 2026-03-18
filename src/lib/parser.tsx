import parse, { HTMLReactParserOptions, Element, domToReact, attributesToProps } from 'html-react-parser';
import { getFaviconUrl } from './api';

export const getParserOptions = (options?: HTMLReactParserOptions): HTMLReactParserOptions => {
  const currentOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'a') {
        const props = attributesToProps(domNode.attribs);
        const href = domNode.attribs.href;
        return (
          <a 
            {...props} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 ${props.className || ''}`}
          >
            {href && !href.startsWith('/') && !href.startsWith('#') && (
              <img 
                src={getFaviconUrl(href)} 
                alt="" 
                className="w-3.5 h-3.5 rounded-sm shrink-0"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
            {domToReact(domNode.children as any, currentOptions)}
          </a>
        );
      }
      if (options?.replace) {
        return (options.replace as (domNode: any) => any)(domNode);
      }
    },
  };
  return currentOptions;
};

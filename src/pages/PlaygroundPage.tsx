// import Onboarding from '../components/Onboarding';
// import { TermsAndConditions } from '../components/TermsAndConditions';
import { ExpandableText } from '../components/ExpandableText';

export function PlaygroundPage() {
  const lorem300 =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a ipsum magna. Donec metus nibh, semper a interdum sed, aliquet ut ante. Etiam vel ante sapien. Phasellus vulputate feugiat ligula, vel hendrerit neque ultricies ac. Phasellus dictum eget diam nec eleifend. Aenean ipsum magna donec.';

  // const lorem200 =
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet mi sem, sed pulvinar erat sollicitudin vel. Morbi dignissim quam consequat augue cursus, at egestas lorem sodales. Nam et blandit.';
  return <ExpandableText text={lorem300} />;
}

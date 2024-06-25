import { render, screen } from '@testing-library/react';
import { ProductImageGallery } from '../../src/components/ProductImageGallery';

describe('ProductImageGallery component', () => {
  it('should not render anything if list is empty', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render a list of images', () => {
    const imageUrls = ['img1', 'img2', 'img3'];

    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);

    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute('src', url);
    });
  });
});

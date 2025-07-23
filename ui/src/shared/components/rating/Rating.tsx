type RatingProps = {
  stars?: number;
};

export const Rating = ({ stars = 0 }: RatingProps) => {
  return (
    <div className='ecms-rating' aria-label={`${stars} stars`}>
      <span aria-hidden>{'★'.repeat(stars)}</span>
    </div>
  );
};

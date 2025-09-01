import Skeleton from "react-loading-skeleton";

interface Props {
  value: string;
  loading?: boolean;
  className?: string;
}

const Label = ({ value, loading, className = "" }: Props) => {
  return loading ? (
    <Skeleton className={className} />
  ) : (
    <div className={className}>{value}</div>
  );
};

export default Label;

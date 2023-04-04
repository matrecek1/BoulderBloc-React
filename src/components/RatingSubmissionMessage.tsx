import Card from "react-bootstrap/Card";

const RatingSubmissionMessage: React.FC<{ text: string }> = ({ text }) => {
    return <Card.Text>{text}</Card.Text>;
};

export default RatingSubmissionMessage;

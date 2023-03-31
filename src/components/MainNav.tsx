import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { Button } from "react-bootstrap";
import ReactStars from "react-stars";

const MainNav: React.FC<{
    header: string | null;
    rating: number | "Not Rated" | null;
}> = ({ header, rating }) => {
    const navigate = useNavigate();
    const location = useLocation()
    return (
        <>
            <Navbar
                bg="light"
                className="border-bottom border-danger border-2 mx-2">
                <Container>
                    <Nav>
                        {location.pathname !== "/gyms" && (
                            <Button
                                variant="outline-danger"
                                className="mx-auto"
                                style={{ height: "45px", width: "45px" }}>
                                <AiOutlineLeft
                                    onClick={() => navigate("..")}
                                    className="fs-1 w-100 my-auto mx-auto"
                                />
                            </Button>
                        )}
                    </Nav>
                    <Navbar.Text className="mx-auto fs-2 text-black">
                        {header !== null ? header : "BlocApp"}
                    </Navbar.Text>
                    {rating !== null ? (
                        <ReactStars
                            count={5}
                            value={rating !== "Not Rated" ? rating : 0}
                            edit={false}
                            size={24}
                            color2={"#ffd700"}
                        />
                    ) : null}
                </Container>
            </Navbar>
        </>
    );
};

export default MainNav;

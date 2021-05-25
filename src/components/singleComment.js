import React from "react";
import { Link } from "gatsby";

const SingleComment = ({ comment, setReplyTo, setReplyToUsername }) => {
    const replying = function () {
        setReplyTo(comment.node._id);
        setReplyToUsername(comment.node.name);
    };

    const convertToReadableDate = function (date) {
        return new Date(date.toString()).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <section id={comment.node._id} className="parent">
            <header>
                <span className="username">{comment.node.name}</span>
                <span className="date">
                    {" "}
                    • {convertToReadableDate(comment.node.date)}
                </span>
            </header>

            <section className="message">
                <p>{comment.node.message}</p>
            </section>
            <Link to="#comment-form" onClick={replying}>
                Répondre
            </Link>
        </section>
    );
};

export default SingleComment;

import React from "react";

const SingleReply = ({ reply }) => {
    const convertToReadableDate = function (date) {
        return new Date(date.toString()).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div key={reply.node._id} className="reply">
            <header>
                <span className="name">{reply.node.name}</span>
                <span className="date">
                    {" "}
                    • {convertToReadableDate(reply.node.date)}
                </span>
            </header>

            <section>
                <p>{reply.node.message}</p>
            </section>
        </div>
    );
};

export default SingleReply;

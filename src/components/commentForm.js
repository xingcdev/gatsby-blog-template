import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import Popup from './popup';

const CommentForm = ({
	replyToId,
	setReplyToId,
	replyToUsername,
	currentPostSlug,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	// source: https://alieliacik.medium.com/create-pop-up-with-timer-in-react-js-27a412313c03
	const [showPopup, setShowPopup] = useState(false);
	let popup = null;
	if (showPopup) {
		if (errorMessage)
			popup = (
				<Popup
					isErrorPopup={true}
					message={'Oh zut, il y a une erreur de soumission : ' + errorMessage}
				/>
			);
		else
			popup = (
				<Popup message="Merci pour ton commentaire. Il va être affiché dans 3 minutes." />
			);
	}

	// Disabled popup when the popup is displayed.
	useEffect(
		function () {
			const secondsBeforeDisabled = 6000;
			const timer = setTimeout(
				() => setShowPopup(false),
				secondsBeforeDisabled
			);
			// Clear setTimeout while component CommentForm is unmounting to avoid the memory leak
			return () => clearTimeout(timer);
		},
		[showPopup]
	);

	const cancelReplying = function () {
		navigate(`#${replyToId}`);
		setReplyToId('');
	};

	// Source : https://github.com/eduardoboucas/staticman/issues/263
	const handleSubmit = async function (event) {
		// event only exists when the click event happens
		// It contains informations about the click event when the submit button was clicked

		// Prevent the default action of a submit button:
		event.preventDefault();
		setIsSubmitting(true);

		const commentForm = event.target;
		const formData = new FormData(commentForm);
		// convert FormData to json object
		// SOURCE: https://stackoverflow.com/a/46774073
		const json = {};
		formData.forEach(function (value, prop) {
			json[prop] = value;
		});
		// Serialize json data
		const formBody = new URLSearchParams(json);

		// Send form data using AJAX
		const response = await fetch(
			'https://{STATICMAN_API_URL}/v3/entry/github/{GIT_USERNAME}/{REPO}/master/comments',
			{
				method: 'POST',
				body: formBody.toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		);

		// Reset errorMessage if there is a error on previous form submit
		if (setErrorMessage) setErrorMessage('');

		if (response.ok) {
			commentForm.reset();
			setReplyToId('');
		} else {
			setErrorMessage(`${response.status} ${response.statusText}`);
			console.log(response);
		}

		setShowPopup(true);
		setIsSubmitting(false);
	};

	return (
		<form
			className="form"
			id="comment-form"
			method="POST"
			onSubmit={handleSubmit}
		>
			<p className="title">
				Laisses une trace écrite de tes pensées <span role="img">😉</span>
			</p>
			{replyToId && (
				<p className="replyTo">
					Répondre à <span className="username">{replyToUsername}</span> •{' '}
					<span className="cancelReplying" onClick={cancelReplying}>
						Annuler
					</span>
				</p>
			)}
			<p className="disclaimer">
				L'email sert à recevoir une notification lorsque que quelqu'un vous
				répond. Il ne sera pas vendu à une entreprise tierce.
			</p>
			<textarea
				name="fields[message]"
				placeholder="Écrire ici..."
				required
				disabled={isSubmitting && true}
			/>
			<input name="fields[slug]" type="hidden" value={currentPostSlug} />
			<input
				// Yml comment file field
				name="fields[reply_to]"
				id="comment-parent"
				type="hidden"
				value={replyToId}
			></input>
			<label>
				Nom* :
				<input
					className="name"
					name="fields[name]"
					type="text"
					placeholder="Dupont du 93"
					required
					disabled={isSubmitting && true}
				/>
			</label>
			<label>
				Email* :
				<input
					className="email"
					name="fields[email]"
					type="email"
					placeholder="mdupont@email.com"
					required
					disabled={isSubmitting && true}
				/>
			</label>
			<button
				type="submit"
				className={isSubmitting ? 'disabled' : undefined}
				disabled={isSubmitting && true}
			>
				{isSubmitting ? <LoadingIcon /> : 'Commenter'}
			</button>

			{popup}
		</form>
	);
};

const LoadingIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="feather feather-loader spin"
	>
		<line x1="12" y1="2" x2="12" y2="6"></line>
		<line x1="12" y1="18" x2="12" y2="22"></line>
		<line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
		<line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
		<line x1="2" y1="12" x2="6" y2="12"></line>
		<line x1="18" y1="12" x2="22" y2="12"></line>
		<line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
		<line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
	</svg>
);

export default CommentForm;

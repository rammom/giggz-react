import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "./MyNavbar.css";

/*
	PROPS
	---------------------------------
	* BrandName (String name shown in large text on the right of the component) REQUIRED
	* OnBrandNameClick (Function called when user clicks on the BrandName link) REQUIRED
	* authenticated (true or false value denoting the user's authenticated state) REQUIRED
	* OnLoginClick (Function called when user clicks login)

	* user (Object containing user data) REQUIRED
		* Object must have at least the following layout:
			*	{
					firstname: (String)
					lastname: (String)
				}
	* OnUserTagClick (Function called whne user clicks on the user tag)

	* CustomLinks (Array of objects containing any custom link data)
		* Object laid out as follows:
			* 	{
					text: (String text display of link)
					onClick: (Function to be called once link is clicked)
					hidden: (True or False value whether to hide link or not *assumed false*)
				}
	* Variant (Change the navbar styles based on enum of variants)
		* "transparent" - Navbar is transparent with white text
		* "red" - Standard red color with white text (used mainly with user front)
		* "blue" - Blue navbar with white text (used mainly with business front)
*/

export class MyNavbar extends Component {

	state = {
		variant: this.props.Variant
	}

	componentDidUpdate(oldProps) {
		if (oldProps.Variant !== this.props.Variant)
			this.setState({variant: this.props.Variant});
	}

	logError = msg => console.log(`ERROR::NAVBAR::${msg}`);

	renderLogInLink = () => {
		return (
			<Nav.Link
				className="navLink "
				hidden={this.props.authenticated}
				onClick={
					this.props.OnLoginClick
						?
						this.props.OnLoginClick
						:
						this.logError("METHOD::OnLoginClick::NOT_DEFINED")
				}
			>
				<i
					className="fa fa-lg fa-user-circle-o userIcon"
				>
				</i>
				<span>
					&nbsp; Log In
						</span>
			</Nav.Link>
		)
	}

	renderUserTagLink = () => {
		return (
			<Nav.Link
				className="navLink"
				hidden={!this.props.authenticated}
				onClick={
					this.props.OnUserTagClick
						?
						this.props.OnUserTagClick
						:
						this.logError("METHOD::OnUserTagClick::NOT_DEFINED")
				}
			>
				<i
					className="fa fa-lg fa-user-circle-o userIcon"
				>
				</i>
				<span>
					&nbsp;
					&nbsp;
							{this.props.user.firstname}
					&nbsp;
							{this.props.user.lastname}
				</span>
			</Nav.Link>
		)
	}

	renderCustomLinks = () => {
		let custom_links = this.props.CustomLinks 
			? [...this.props.CustomLinks] 
			: [
				{
					text: "Find A Gigg",
					onClick: () => this.props.history.push('/stores'),
					hidden: false,
				},
			];

		let links = []
		for (let i = 0; i < custom_links.length; ++i) {
			links.push(
				<Nav.Link
					key={i}
					className="navLink "
					hidden={custom_links[i].hidden}
					onClick={
						custom_links[i].onClick
						?
							custom_links[i].onClick
						:
						this.logError(
							`METHOD::${custom_links[i].text?custom_links[i].text:""}::NOT_DEFINED`
						)
					}

				>
					<span>
						{custom_links[i].text}
					</span>
				</Nav.Link>
			);
		}
		return links;
	}

	render() {
		return (
			<Navbar 
				variant="dark" 
				className={`masterNavbar ${this.state.variant}`}
			>

				<Navbar.Brand
					className="navBrand "
					onClick={
						this.props.OnBrandNameClick
						?
						this.props.OnBrandNameClick
						:
						this.logError("METHOD::OnBrandNameClick::NOT_DEFINED")
					}
				>
					{this.props.BrandName ? this.props.BrandName : "BrandName"}
				</Navbar.Brand>

				<Nav
					className="ml-auto"
				>

					{/* LOG IN */}
					{this.renderLogInLink()}

					{/* USER TAG */}
					{this.renderUserTagLink()}

					{/* CUSTOM LINKS */}
					{this.renderCustomLinks()}

				</Nav>

			</Navbar>
		)
	}
}

export default MyNavbar;
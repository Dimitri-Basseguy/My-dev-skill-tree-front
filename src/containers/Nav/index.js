import { connect } from 'react-redux';

import { logout } from 'src/actions/user';

import Nav from 'src/components/Nav';

const mapStateToProps = (state) => ({
  username: state.user.user.slug,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);

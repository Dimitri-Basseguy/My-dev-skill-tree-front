import { connect } from 'react-redux';

import Avatar from 'src/components/Profile/Avatar';

const mapStateToProps = (state) => ({
  img: state.user.user.avatar,
});

export default connect(
  mapStateToProps,
)(Avatar);

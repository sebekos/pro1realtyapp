import React from "react";
import AvatarImageCropper from "react-avatar-image-cropper";
import { connect } from "react-redux";
import { updateAvatar } from "reduxStore";

const Avatar = ({ memberId, avatar_link, updateAvatar }) => {
  const apply = (file) => {
    // handle the blob file you want
    // such as get the image src
    // var src = window.URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("memberId", memberId);
    updateAvatar(formData);
  };
  return (
    <div
      style={{
        width: "353px",
        height: "303px",
        margin: "auto",
        border: "1px solid black",
      }}
    >
      <AvatarImageCropper apply={apply} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.team.loading,
});

const mapDispatchToProps = {
  updateAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

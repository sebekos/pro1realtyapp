
import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { uploadAvatar } from '../../Redux/actions/profile';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


const Avatar = ({ uploadAvatar, profile, history }) => {
    const [filenames, setFilenames] = useState('Choose File');
    const [photo, setPhoto] = useState('');
    const [editor, setEditor] = useState('');
    const [preview, setPreview] = useState('');
    const [scale, setScale] = useState(1.2);
    const [file, setFile] = useState('');
    const [scaledImage, setScaledImage] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilenames(e.target.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            setPhoto(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const onEditor = editor => {
        setEditor(editor);
    }

    const onPreview = e => {
        const canvasScaled = editor.getImageScaledToCanvas();
        setPreview(editor.getImageScaledToCanvas().toDataURL());
        canvasScaled.toBlob(function (blob) {
            setScaledImage(blob);
        });
    }

    const onSave = e => {
        e.preventDefault();
        var newfile = new File([scaledImage], "file");
        const formData = new FormData();
        formData.append('file', newfile);
        uploadAvatar(formData, profile, history);
    }

    const onScale = value => {
        setScale(value);
    }

    return (
        <div className='avatareditor'>
            <Link className="btn btn-primary my-1" to="/dashboard">Go To Dashboard</Link>
            <AvatarEditor
                ref={editor => onEditor(editor)}
                image={photo !== '' ? photo : ""}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={0}
            />
            <div className='custom-file mb-2'>
                <input
                    type='file'
                    className='custom-file-input'
                    id='customFile'
                    onChange={onChange}
                    multiple
                    accept='image/*'
                />
                <label className='custom-file-label' htmlFor='customFile'>
                    {filenames}
                </label>
            </div>
            <p>Scale</p>
            <Slider
                min={.5}
                max={3}
                step={.1}
                onChange={value => onScale(value)}
                value={scale}
                className="mb-2"
            />
            {file !== '' ? <button onClick={e => onPreview(e)} className='btn btn-primary mb-1'>Preview</button> : null}
            {preview !== '' ? <button onClick={e => onSave(e)} className='btn btn-secondary mb-2'>Save</button> : null}
            <div className='gen-center'>
                <img src={preview !== '' ? preview : ''} alt='' className='avatar-preview' />
            </div>
        </div>

    )
}

Avatar.propTypes = ({
    uploadAvatar: PropTypes.func.isRequired
})

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { uploadAvatar })(Avatar)

import TalkFun from '@/utils/talkFun';
const btnStyle = {
    border: '1px solid #CCC',
    margin: 10,
    padding: 5
}
const playerStyle = {
    height: 200,
    width: 300,
    border: '1px solid #CCC'
}

export default function TalkAboard() {

    return (
        <div>
            <div className="white_board_setion">
                <button
                    style={btnStyle}
                    onClick={
                        () => {
                            let payload = {
                                docContainer: "hcpWhiteBoardContainer",
                                docplayerId: "hcpPlayerConatiner",
                                callback: (player) => {
                                    console.log('课件播放器,初始化成功', player)
                                    player.whiteboardResize()
                                }
                            }
                            new TalkFun().whiteboardPlayer(payload)
                        }
                    }>{'初始化白板'}</button>

                <div id="hcpWhiteBoardContainer" style={playerStyle}>
                    <div id="hcpPlayerConatiner" style={playerStyle}></div>
                </div>

            </div>

            <div className="video_player_setion">
            <button
                    style={btnStyle}
                    onClick={
                        () => {
                            let payload = {
                                cameraContainer: "cameraContainer",
                                cameraId: "hcpCamera",
                                callback: (camera) => {
                                    console.log('cameraPlayer init success', camera)
                                }
                            }
                            new TalkFun().videoPlayer(payload)
                        }
                    }>{'创建视频播放器'}</button>
                <div id="cameraContainer" style={playerStyle}>
                <div id="hcpCamera" style={playerStyle}></div>
                </div>
               
            </div>

        </div>
    )
}
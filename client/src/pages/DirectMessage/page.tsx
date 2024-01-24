import {Layout} from "@/pages/DirectMessage/styles";
import {DMnav} from "@/pages/DirectMessage/DMnav";

export const DM = ()=> {
    return(
        <Layout>
            {/*남이 보낸 영역*/}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    발신자 이름
                    {/*아래는 발신 시간*/}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                {/*아래는 발신 메시지*/}
                <div className="chat-bubble bg-[#FFF974] text-gray-950">You were the Chosen One!</div>
                {/*아래는 확인 여부: 구현할 것인지 확인 필요*/}
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>

            {/*내가 보낼 영역*/}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    본인 닉네임
                    {/*아래는 본인의 발신 시간*/}
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                {/*아래는 메시지*/}
                <div className="chat-bubble bg-[#E4FFCF] text-gray-950">I hate you!</div>
                {/*확인 여부*/}
                <div className="chat-footer opacity-50">
                    Seen at 12:46
                </div>
            </div>
            {/*남이 보낸 영역*/}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    발신자 이름
                    {/*아래는 발신 시간*/}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                {/*아래는 발신 메시지*/}
                <div className="chat-bubble bg-[#FFF974] text-gray-950">You were the Chosen One!</div>
                {/*아래는 확인 여부: 구현할 것인지 확인 필요*/}
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>

            {/*내가 보낼 영역*/}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    본인 닉네임
                    {/*아래는 본인의 발신 시간*/}
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                {/*아래는 메시지*/}
                <div className="chat-bubble bg-[#E4FFCF] text-gray-950">I hate you!</div>
                {/*확인 여부*/}
                <div className="chat-footer opacity-50">
                    Seen at 12:46
                </div>
            </div>
            {/*남이 보낸 영역*/}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    발신자 이름
                    {/*아래는 발신 시간*/}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                {/*아래는 발신 메시지*/}
                <div className="chat-bubble bg-[#FFF974] text-gray-950">You were the Chosen One!</div>
                {/*아래는 확인 여부: 구현할 것인지 확인 필요*/}
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>

            {/*내가 보낼 영역*/}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    본인 닉네임
                    {/*아래는 본인의 발신 시간*/}
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                {/*아래는 메시지*/}
                <div className="chat-bubble bg-[#E4FFCF] text-gray-950">I hate you!</div>
                {/*확인 여부*/}
                <div className="chat-footer opacity-50">
                    Seen at 12:46
                </div>
            </div>
            {/*남이 보낸 영역*/}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    발신자 이름
                    {/*아래는 발신 시간*/}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                {/*아래는 발신 메시지*/}
                <div className="chat-bubble bg-[#FFF974] text-gray-950">You were the Chosen One!</div>
                {/*아래는 확인 여부: 구현할 것인지 확인 필요*/}
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>

            {/*내가 보낼 영역*/}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    본인 닉네임
                    {/*아래는 본인의 발신 시간*/}
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                {/*아래는 메시지*/}
                <div className="chat-bubble bg-[#E4FFCF] text-gray-950">I hate you!</div>
                {/*확인 여부*/}
                <div className="chat-footer opacity-50">
                    Seen at 12:46
                </div>
            </div>
            {/*남이 보낸 영역*/}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    발신자 이름
                    {/*아래는 발신 시간*/}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                {/*아래는 발신 메시지*/}
                <div className="chat-bubble bg-[#FFF974] text-gray-950">You were the Chosen One!</div>
                {/*아래는 확인 여부: 구현할 것인지 확인 필요*/}
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>

            {/*내가 보낼 영역*/}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    본인 닉네임
                    {/*아래는 본인의 발신 시간*/}
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                {/*아래는 메시지*/}
                <div className="chat-bubble bg-[#E4FFCF] text-gray-950">I hate you!</div>
                {/*확인 여부*/}
                <div className="chat-footer opacity-50">
                    Seen at 12:46
                </div>
            </div>
            {/*남이 보낸 영역*/}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    발신자 이름
                    {/*아래는 발신 시간*/}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                {/*아래는 발신 메시지*/}
                <div className="chat-bubble bg-[#FFF974] text-gray-950">You were the Chosen One!</div>
                {/*아래는 확인 여부: 구현할 것인지 확인 필요*/}
                <div className="chat-footer opacity-50">
                    Delivered
                </div>
            </div>

            {/*내가 보낼 영역*/}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    {/*사진 영역*/}
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component"
                             src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <div className="chat-header">
                    본인 닉네임
                    {/*아래는 본인의 발신 시간*/}
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                {/*아래는 메시지*/}
                <div className="chat-bubble bg-[#E4FFCF] text-gray-950">I hate you!</div>
                {/*확인 여부*/}
                <div className="chat-footer opacity-50">
                    Seen at 12:46
                </div>
            </div>
            <DMnav/>

        </Layout>
    )
}


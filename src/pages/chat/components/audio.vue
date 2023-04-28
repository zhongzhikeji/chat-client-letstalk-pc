<template>
  <div>
    <select v-model="selectedDeviceId">
      <option value="">请选择音频设备</option>
      <option v-for="device in audioInputDevices" :key="device.deviceId" :value="device.deviceId">
        {{ device.label }}
      </option>
    </select>
    <button @click="startRecording" :disabled="!selectedDeviceId">开始录音</button>
    <button @click="stopRecording" :disabled="!mediaRecorder">停止录音</button>
    <button @click="playRecording" :disabled="!mediaRecorder">play</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDeviceId: '',
      audioInputDevices: [],
      mediaRecorder: null,
      recordedChunks: [],
    };
  },
  mounted() {
    this.getAudioInputDevices();
  },
  methods: {
    getAudioInputDevices() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log('该浏览器不支持获取设备列表');
        return;
      }

      navigator.mediaDevices.enumerateDevices().then((devices) => {
        console.log(devices);
        this.audioInputDevices = devices.filter((device) => {
          return device.kind === 'audioinput'
        
        })
      });
    },
    startRecording() {
      navigator.mediaDevices.getUserMedia({ audio: { deviceId: this.selectedDeviceId } }).then((stream) => {
        console.log(stream)
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            console.log(event.data)
            this.recordedChunks.push(event.data);
          }
        });
      
        this.mediaRecorder.start();
      }).catch((error) => {
        console.log('启动录音失败：', error);
      });
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.mediaRecorder = null;

        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);

        const audio = new Audio(url)

        audio.play()

        // 在控制台输出录音文件的 URL
        console.log('录音文件 URL：', url);

        this.recordedChunks = [];
      }
    },

    playRecording() {
      new audio()
    },
  },
};
</script>

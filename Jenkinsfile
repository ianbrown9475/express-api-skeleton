pipeline {
    agent { docker { image 'node:10' } }
    stages {
        stage('build') {
            steps {
                sh 'yarn install'
            }
        }
        stage('lint') {
            steps {
                sh 'gulp lint'
            }
        }
        stage('test') {
            steps {
                sh 'gulp test'
            }
        }
    }
}

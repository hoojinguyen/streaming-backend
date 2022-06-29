    pipeline {

    agent any    

    stages {


        stage('Test') {
            steps {
                echo 'Skip Testing...'
            }
        }

        stage("Build Container Image") {
            steps { 
                script {
                    appName = "streaming.backend" 
                    sh "git rev-parse --short HEAD > commit-id"           
                    tag = "${env.GIT_BRANCH.replace("origin/", "")}_${readFile('commit-id').replace("\n", "").replace("\r", "")}"                    
                    env.IMG = "gcr.io/technology-athenka/${appName}:${tag}"
                    env.KUBECONFIG = "/home/user/duongngo_workspace/kubernetes_configs/config"
                    sh "docker build -t ${env.IMG} ."
                    sh "docker push ${env.IMG}"   
                }                
            }            
        }

        stage("Deploy To Staging") {                        
            when {
                expression { env.GIT_BRANCH == 'origin/master' }
            }
            steps { 
                sh "kubectl config view"
                sh "kubectl config --kubeconfig=$KUBECONFIG view"
                sh "kubectl config --kubeconfig=$KUBECONFIG use-context minikube"
                sh "kubectl config --kubeconfig=$KUBECONFIG current-context"                
                sh "sed 's#__IMAGE__#'$IMG'#' k8s/deployment.yaml | kubectl --kubeconfig=$KUBECONFIG apply -f -"
            }           
        }
                    

        stage("Clean Workspace") { 
            steps {
                deleteDir()
                sh 'ls -lah'
            }                        
        }     
                
    }
}
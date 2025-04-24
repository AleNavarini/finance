package main

import (
	"fmt"
	"log"
	"net"

	pb "github.com/AleNavarini/finance/user/proto"
	"google.golang.org/grpc"
)

var addr string = "0.0.0.0:50051"

type Server struct {
	pb.UserServiceServer
}

func main() {
	fmt.Println("Starting up ...")
	listen, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatal("Problem starting server")
	}
	fmt.Printf("Starting to listen in %v port\n", addr)

	server := grpc.NewServer()

	if err = server.Serve(listen); err != nil {
		log.Fatalf("Can not server %v", err)
	}
}

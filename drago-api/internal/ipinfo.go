package internal

import (
	"net"
	"time"

	"github.com/ipinfo/go/v2/ipinfo"
	"github.com/ipinfo/go/v2/ipinfo/cache"
)

var (
	ipService Ipinfo
)

type Ipinfo interface {
	GetIpinfo(ip string) (*ipinfo.Core, error)
}

type ClientOption struct{ ApiKey string }

type ipClient struct {
	client *ipinfo.Client
}

func NewIpClient(opt ClientOption) Ipinfo {
	ipc := ipinfo.NewClient(
		nil,
		ipinfo.NewCache(
			cache.NewInMemory().WithExpiration(time.Hour*24),
		),
		opt.ApiKey,
	)
	ipService = &ipClient{ipc}
	return &ipClient{ipc}
}

func GetIpService() Ipinfo {
	return ipService
}

func (ipc ipClient) GetIpinfo(ip string) (*ipinfo.Core, error) {
	info, err := ipc.client.GetIPInfo(net.ParseIP(ip))
	if err != nil {
		return nil, err
	}

	return info, nil
}
